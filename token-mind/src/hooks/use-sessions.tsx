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
  refetch: () => Promise<void>;
}

export function useChatSessions(): SessionsResult {

    const [sessions, setSessions] = useState<ChatSession[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { status } = useSession();
    
    const fetchSessions = useCallback(async () => {
        if(status !== 'authenticated'){
            setLoading(false);
            return
        }
        setLoading(true);
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
      setSessions(data.sessions || []);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Unknown error");
      setSessions([]);
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  return { sessions, loading, error, refetch: fetchSessions };
}
