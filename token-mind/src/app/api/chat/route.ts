import { streamText, convertToCoreMessages, type Message } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { chooseAgent } from "./helper/helper";
import { model } from "@/lib/model";
import { agents } from "../../../../ai/agent/agent";

const systemPrompt = `You are TokenMind agents that each have specialized tasks.
Given this list of agents and their capabilities, choose the one that is most appropriate for the user's request.
${agents.map(agent => `${agent.name}: ${agent.systemPrompt}`).join("\n")}
  If any of these does not fall into user's prompt, do well to answer the user without. Anything that falls outside of this, do not reply to it. Kindly reply the user that it is not part of what you are built for. Always make your response concise and avoid buzz words.
  Unless explicitly stated, you should not reiterate the output of the tool as it is shown in the user interface
`;

// Use the SDK's own client message shape (this is what useChat sends:
// role + content + optional parts) instead of a hand-rolled type — the SDK's
// internal types (CoreMessage) have a stricter content union per role
// (assistant/tool content can be an array of parts, not just a string),
// so a custom type will fight the overloads. convertToCoreMessages()
// below does that normalization for us.
const isValidSolanaAddress = (address: string): boolean => {
  // Base58, 32-44 chars — a shape check, not a guarantee the account exists.
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
};

const getLastTenMessages = (arr: Message[]): Message[] => {
  return arr.slice(-10);
};

export const POST = async (req: NextRequest) => {
  let messages: Message[];

  try {
    const body = await req.json();
    messages = body?.messages;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
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

  const rawWalletAddress = req.nextUrl.searchParams.get("walletAddress");
  const walletAddress =
    rawWalletAddress && isValidSolanaAddress(rawWalletAddress) ? rawWalletAddress : null;

  if (rawWalletAddress && !walletAddress) {
    console.warn(`[route] rejected malformed walletAddress param: ${rawWalletAddress}`);
  }

  const recentMessages = getLastTenMessages(messages);
  const conversationHistory = convertToCoreMessages(recentMessages);
  const scopedSystemPrompt = walletAddress
    ? `${systemPrompt}. This current user's wallet address is ${walletAddress}`
    : `${systemPrompt}. No wallet address is currently connected for this user.`;

  // --- Routing: failures here are caught and fall back to plain chat ---
  let agent: Awaited<ReturnType<typeof chooseAgent>> = null;
  try {
    agent = await chooseAgent(conversationHistory);
  } catch (error) {
    console.error("[route] unexpected error choosing agent:", error);
    agent = null;
  }

  console.log("[route] routed to agent:", agent?.name ?? "NONE");

  try {
    const result = streamText({
      model,
      system: scopedSystemPrompt,
      messages: conversationHistory,
      tools: agent ? { [agent.name]: agent.tools } : undefined,
      toolChoice: agent ? "auto" : undefined,
      maxSteps: 10,
      maxRetries: 0,
      onError: ({ error }) => {
        // This is what actually surfaces tool failures, model hiccups, etc.
        // that happen after the response has already started streaming.
        console.error("[route] stream error:", error);
      },
    });

    return result.toDataStreamResponse({
      getErrorMessage: (error) => {
        // Controls what the client sees in-stream on failure.
        // Keep this generic — never leak raw error.message to the client.
        console.error("[route] stream-level error surfaced to client:", error);
        return "Something went wrong while generating a response. Please try again.";
      },
    });
  } catch (error) {
    // Catches only synchronous/setup failures before streaming begins
    // (e.g. bad tool config, invalid model call).
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