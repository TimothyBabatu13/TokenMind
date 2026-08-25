"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";

export interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

interface SessionsResult {
  sessions: ChatSession[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<ChatSession[]>;
}

export function useChatSessions(): SessionsResult {
  const [sessions, setSessions] = useState<ChatSession[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { status } = useSession();

  const fetchSessions = useCallback(async (opts?: { silent?: boolean }) => {
    if (status !== "authenticated") {
      setLoading(false);
      return [] as ChatSession[];
    }

    if (!opts?.silent) {
      setLoading(true);
    }

    try {
      const res = await fetch("/api/chat/get-sessions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();
      const list: ChatSession[] = data.sessions || [];
      setSessions(list);
      setError(null);
      return list;
    } catch (err: any) {
      setError(err.message || "Unknown error");
      setSessions([]);
      return [] as ChatSession[];
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const refetch = useCallback(() => fetchSessions({ silent: true }), [fetchSessions]);

  return { sessions, loading, error, refetch };
}
