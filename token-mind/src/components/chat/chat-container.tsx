"use client";

import { useAIChatProvider } from "@/context/ai-chat-provider";
import { LimitReachedDialog } from "../limit-reached-dialog";
import Messages from "./messages";
import MultimodalInput from "./multimodal-input";
import { useEffect, useState } from "react";

const ChatContainer = () => {
    
    const { usage } = useAIChatProvider();
    const [showOnce, setShowOnce] = useState(false);
    
    useEffect(() => {
        if (!usage) return;
        if (usage.unlimited) return;
        if (usage.remaining === 0) setShowOnce(true);
    }, [usage]);
    
    return (
    <>
        <LimitReachedDialog 
            open={showOnce} 
            onDismiss={() => setShowOnce(false)} 
        />
        <Messages />
        <MultimodalInput />
    </>
  )
}

export default ChatContainer