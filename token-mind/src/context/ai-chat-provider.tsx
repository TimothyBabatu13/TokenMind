"use client";

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
    setMessages: (messages: Message[] | ((messages: Message[]) => Message[])) => void
}

const ChatContext = createContext<ChatProviderProps | undefined>(undefined)

const AiChatProvider = ({ children } : {
    children: React.ReactNode
}) => {
    const { messages, handleSubmit, handleInputChange, input, isLoading, append, error, reload, setMessages } = useChat({api: `/api/chat?walletAddress=${null}`})
  return (
    <ChatContext.Provider 
        value={{messages, handleSubmit, handleInputChange, input, isLoading, append, error, reload, setMessages}}
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