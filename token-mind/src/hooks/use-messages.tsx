"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";
import type { Message } from "ai";

interface MessagesResult {
  messages: Message[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useChatMessages(sessionId: string | null): MessagesResult {
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [loadedSessionId, setLoadedSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { status } = useSession();

  if (sessionId !== loadedSessionId) {
    if (messages !== null) {
      setMessages(null);
    }
    if (!loading) {
      setLoading(true);
    }
  }

  const fetchMessages = useCallback(async () => {
    if (status !== "authenticated") {
      setMessages(null);
      setLoadedSessionId(sessionId);
      setLoading(false);
      return;
    }
    if (!sessionId) {
      setError("sessionId is required");
      setMessages(null);
      setLoadedSessionId(null);
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
      setLoadedSessionId(sessionId);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Unknown error");
      setMessages(null);
      setLoadedSessionId(sessionId);
    } finally {
      setLoading(false);
    }
  }, [status, sessionId]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return { messages, loading, error, refetch: fetchMessages };
}
