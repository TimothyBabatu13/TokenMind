"use client";

import { useAIChatProvider } from "@/context/ai-chat-provider";
import { cn } from "@/lib/utils";
import Form from "./form";

const Messages = () => {
    const { messages } = useAIChatProvider();
    if(!messages.length) return null
  return (
    <div 
        className="sticky bottom-0 z-1 mx-auto flex w-full max-w-4xl gap-2 border-t-0 bg-background px-2 pb-3 md:px-4 md:pb-4"
    >
        <div className={cn("relative flex h-[90dvh] w-[100%] mt-[20px] flex-col gap-4")}>
            <div className="flex-1 absolute top-0 left-0 right-0 bottom-0 overflow-y-auto h-[68dvh] scroll-area ">
                This is message content
            </div>
            <div className="absolute bottom-0 w-full z-30 bg-inherit">
                <Form />
            </div>
          </div>
        </div>
  )
}

export default Messages