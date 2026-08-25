import {
  generateId,
  type Message,
  type UIMessage,
} from "ai";
import { Prisma } from "../generated/prisma/client";
import prisma from "@/lib/prisma";

type Json = Prisma.InputJsonValue;

const asJson = (value: unknown): Json => value as Json;

export function textFromMessage(message: Pick<Message, "content" | "parts">): string {
  if (typeof message.content === "string" && message.content.trim()) {
    return message.content;
  }

  return (message.parts ?? [])
    .filter((part): part is { type: "text"; text: string } => part.type === "text")
    .map((part) => part.text)
    .join("\n");
}

export function partsFromMessage(message: Pick<Message, "content" | "parts">): Json {
  if (Array.isArray(message.parts) && message.parts.length > 0) {
    return asJson(message.parts);
  }

  return asJson([{ type: "text", text: message.content ?? "" }]);
}

export function attachmentsFromMessage(message: Message): Json {
  return asJson(message.experimental_attachments ?? []);
}

export function buildTextAssistantMessage(text: string): Message {
  return {
    id: generateId(),
    role: "assistant",
    content: text,
    parts: [{ type: "text", text }],
  };
}

export function buildToolAssistantMessage(
  toolName: string,
  result: unknown,
  toolCallId: string
): Message {
  return {
    id: generateId(),
    role: "assistant",
    content: "",
    parts: [
      {
        type: "tool-invocation",
        toolInvocation: {
          toolCallId,
          toolName,
          state: "result",
          args: {},
          result,
        },
      },
    ],
  };
}

type MessageRow = {
  id: unknown;
  role: unknown;
  content: unknown;
  parts: unknown;
  attachments?: unknown;
  createdAt: unknown;
};

export function toUIMessages(rows: MessageRow[]): Message[] {
  return rows.map((row) => {
    const id = String(row.id);
    const content = typeof row.content === "string" ? row.content : "";
    const createdAt =
      row.createdAt instanceof Date
        ? row.createdAt
        : new Date(typeof row.createdAt === "string" ? row.createdAt : Date.now());

    return {
      id,
      role: (typeof row.role === "string" ? row.role : "assistant") as Message["role"],
      content,
      createdAt,
      parts: (Array.isArray(row.parts)
        ? row.parts
        : [{ type: "text", text: content }]) as UIMessage["parts"],
      experimental_attachments: Array.isArray(row.attachments) ? row.attachments : [],
    };
  });
}

export async function persistChatMessages(opts: {
  sessionId: string;
  userId: string;
  title?: string;
  messages: Message[];
}) {
  const { sessionId, userId, title, messages } = opts;

  await prisma.chatSession.upsert({
    where: { id: sessionId },
    update: { updatedAt: new Date() },
    create: {
      id: sessionId,
      userId,
      title: title?.slice(0, 60) || null,
    },
  });

  for (const message of messages) {
    const id = message.id || generateId();
    const content = textFromMessage(message);
    const parts = partsFromMessage(message);
    const attachments = attachmentsFromMessage(message);

    await prisma.message.upsert({
      where: { id },
      create: {
        id,
        sessionId,
        role: message.role,
        content,
        parts,
        attachments,
      },
      update: {
        sessionId,
        role: message.role,
        content,
        parts,
        attachments,
      },
    });
  }
}
