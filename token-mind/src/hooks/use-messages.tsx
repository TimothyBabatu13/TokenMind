"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";

export interface ChatMessage {
  id: string;
  content: string;
  createdAt: string;
  role: string;
  parts: any;
}

interface MessagesResult {
  messages: ChatMessage[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useChatMessages(sessionId: string | null): MessagesResult {
  const [messages, setMessages] = useState<ChatMessage[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { status } = useSession();

  const fetchMessages = useCallback(async () => {
    if (status !== "authenticated") {
      setMessages(null);
      setLoading(false);
      return;
    }
    if (!sessionId) {
      setError("sessionId is required");
      setMessages(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/chat/get-sessions-messages?sessionId=${sessionId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();
      setMessages(data.messages || []);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Unknown error");
      setMessages(null);
    } finally {
      setLoading(false);
    }
  }, [status, sessionId]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return { messages, loading, error, refetch: fetchMessages };
}
