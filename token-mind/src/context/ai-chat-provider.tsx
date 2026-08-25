"use client";

import { UsageStatus, useUsage } from "@/hooks/use-chat-limit";
import { useChatMessages } from "@/hooks/use-messages";
import { ChatSession, useChatSessions } from "@/hooks/use-sessions";
import { useHandleSession } from "@/hooks/useHandleSession";
import { useChat } from "@ai-sdk/react";
import { ChatRequestOptions, CreateMessage, Message, UIMessage } from "ai";
import { ChangeEvent, createContext, use } from "react";

interface ChatProviderProps {
    messages: UIMessage[],
    handleSubmit: (event?: { preventDefault?: (() => void) | undefined } | undefined, chatRequestOptions?: ChatRequestOptions | undefined) => void,
    handleInputChange: (e: ChangeEvent<HTMLInputElement, Element> | ChangeEvent<HTMLTextAreaElement, Element>) => void,
    input: string,
    isLoading: boolean,
    append: (message: Message | CreateMessage, chatRequestOptions?: ChatRequestOptions) => Promise<string | null | undefined>,
    error: Error | undefined,
    reload: (chatRequestOptions?: ChatRequestOptions | undefined) => Promise<string | null | undefined>,
    setMessages: (messages: Message[] | ((messages: Message[]) => Message[])) => void,
    usage: UsageStatus | null,
    startNewChat: () => void,
    sessionId: string,
    sessions: ChatSession[] | null,
    isSessionLoading: boolean,
    handleSetSessionId: (id: string) => void
}

const ChatContext = createContext<ChatProviderProps | undefined>(undefined)

const AiChatProvider = ({ children } : {
    children: React.ReactNode
}) => {
    const { fingerprint, usage, loading, refetch } = useUsage();
    
    const { sessionId, startNewChat: clearChat, handleSetSessionId } = useHandleSession();
    const { sessions, loading:isSessionLoading } = useChatSessions();

    const { messages, handleSubmit, handleInputChange, input, isLoading, append, error, reload, setMessages } = useChat({
        api: `/api/chat?walletAddress=${null}&sessionId=${sessionId}`,
        headers: fingerprint ? { "x-fingerprint": fingerprint } : undefined,
        onFinish: async () => {
            if (fingerprint) {
                await refetch()
            }
        },
    })

    const { messages: chatMessages } = useChatMessages(sessionId);

    const startNewChat = () => clearChat(()=> setMessages([]));

    const isProviderLoading = isLoading || loading;

  return (
    <ChatContext.Provider 
        value={{messages, handleSubmit, handleInputChange, input, isLoading: isProviderLoading, append, error, reload, setMessages, usage, sessionId, startNewChat, isSessionLoading, sessions, handleSetSessionId}}
    >
        {children}
    </ChatContext.Provider>
  )
}

export const useAIChatProvider = () => {
    const context = use(ChatContext);
    if(!context) {
        throw new Error('use ai chat provider must be used inside the context of it parent');
    }
    return context;
}

export default AiChatProvider