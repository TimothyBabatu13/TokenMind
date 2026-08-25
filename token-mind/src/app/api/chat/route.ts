// export const runtime = "edge";

import { streamText, convertToCoreMessages, type Message } from "ai";
import { after, NextRequest, NextResponse } from "next/server";
import { model } from "@/lib/model";
import { agents } from "../../../../ai/agent/agent";
import { matchDeterministicIntent } from "../../../../ai/agent/static-response";
import { respondWithDirectText, respondWithDirectToolResult } from "@/lib/direct-tool-response";
import { getClientIp } from "@/lib/get-client-ip";
import { checkAndIncrementUsage } from "@/lib/rate-limit";
import { GUEST_DAILY_LIMIT } from "@/constants/constants";
import prisma from "@/lib/prisma";
import { getAuthToken, getSessionId } from "@/lib/get-auth-token";

const systemPrompt = `You are TokenMind — an intelligent assistant with access to specialized tools. Each tool below has a name and purpose. Use the tool that clearly matches the user's request; do not guess or combine tools.

${agents.map(agent => `${agent.name}: ${agent.systemPrompt}`).join("\n")}

Rules:
- Only use a tool when the user's request clearly matches its stated purpose.
- If the user's request does not match any tool and isn't general knowledge you can answer directly, reply that it's outside what you're built for. Be concise, no buzzwords.
- Unless explicitly asked, do not restate a tool's output verbatim — the UI already shows it.
`;

const isValidSolanaAddress = (address: string): boolean => {
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
};

const getLastTenMessages = (arr: Message[]): Message[] => {
  return arr.slice(-10);
};

// All agents' tools merged into one map — the model picks via native tool-calling,
// no separate router call needed.
const allTools = Object.fromEntries(agents.map(a => [a.name, a.tools]));

export const POST = async (req: NextRequest) => {
  let messages: Message[];

  try {
    const body = await req.json();
    messages = body?.messages;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json(
      { error: "`messages` array is required and cannot be empty." },
      { status: 400 }
    );
  }

  const lastMessage = messages[messages.length - 1];
  if (!lastMessage || typeof lastMessage.content !== "string" || !lastMessage.content.trim()) {
    return NextResponse.json(
      { error: "The last message must have non-empty text content." },
      { status: 400 }
    );
  }
  
  const token = await getAuthToken(req);
  
  if (!token) {
    const ip = getClientIp(req);
    const fingerprint = req.headers.get("x-fingerprint");
    const { allowed } = await checkAndIncrementUsage(ip, fingerprint, GUEST_DAILY_LIMIT);
    if (!allowed) {
      return respondWithDirectText("You've reached today's guest limit. Sign in for unlimited access.");
    }
  }

  const sessionId = getSessionId(req)
  
  if (token && sessionId) {
    after(async () => {
      try {
        
        await prisma.chatSession.upsert({
          where: { id: sessionId },
          update: { updatedAt: new Date() },
          create: {
            id: sessionId,
            userId: token.sub!,
            title: lastMessage.content.slice(0, 60),
          },
        });
        
        await prisma.message.create({
          data: {
            sessionId,
            role: "user",
            content: lastMessage.content,
          },
        });
      } catch (err) {
        console.error("[db] failed to save session/message:", err);
      }
    });
  }


  const matchedIntent = matchDeterministicIntent(lastMessage.content);
  if (matchedIntent) {
    console.log("my local intent caught this", matchedIntent.name);
    if (matchedIntent.type === "tool") {
      const payload = await matchedIntent.getPayload();
      return respondWithDirectToolResult(matchedIntent.toolName, payload);
    }
    return respondWithDirectText(matchedIntent.getText());
  }

  const rawWalletAddress = req.nextUrl.searchParams.get("walletAddress");
  
  const walletAddress =
    rawWalletAddress && isValidSolanaAddress(rawWalletAddress) ? rawWalletAddress : null;

  if (rawWalletAddress && !walletAddress) {
    console.warn(`[route] rejected malformed walletAddress param: ${rawWalletAddress}`);
  }

  const recentMessages = getLastTenMessages(messages);
  const conversationHistory = convertToCoreMessages(recentMessages);
  const scopedSystemPrompt = walletAddress
    ? `${systemPrompt}\nThis current user's wallet address is ${walletAddress}`
    : `${systemPrompt}\nNo wallet address is currently connected for this user.`;

  try {
    const result = streamText({
      model,
      system: scopedSystemPrompt,
      messages: conversationHistory,
      tools: allTools,
      toolChoice: "auto",
      maxSteps: 10,
      maxRetries: 0,
      maxTokens: 8000,
      onStepFinish: ({ toolCalls }) => {
        if (toolCalls?.length) {
          console.log("[route] tool(s) used:", toolCalls.map(t => t.toolName));
        }
      },
      onError: ({ error }) => {
        console.error("[route] stream error:", error);
      },
    });

    return result.toDataStreamResponse({
      getErrorMessage: (error) => {
        console.error("[route] stream-level error surfaced to client:", error);
        return "Something went wrong while generating a response. Please try again.";
      },
    });
  } catch (error) {
    const err = error as Error;
    console.error("[route] setup error before streaming started:", {
      message: err.message,
      name: err.name,
      cause: err.cause,
    });

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
};