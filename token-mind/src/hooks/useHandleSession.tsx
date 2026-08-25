"use client";

import { useState } from "react";

interface HandleSession {
  sessionId: string,
  startNewChat: (clearMessages: () => void) => void
}

export function useHandleSession(): HandleSession {
  const [sessionId, setSessionId] = useState<string>(() => crypto.randomUUID());

  const startNewChat = (clearMessages: () => void) => {
    setSessionId(crypto.randomUUID());
    clearMessages();
  };

  return { sessionId, startNewChat };
}
