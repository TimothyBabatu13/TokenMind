"use client";

import { useAIChatProvider } from "@/context/ai-chat-provider";
import { cn } from "@/lib/utils";
import Form from "./form";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useRef } from "react";
import { ToolRenderer } from "./tools";



const MessageText = ({ content, role } : {
    content: string,
    role: "system" | "user" | "assistant" | "data"
}) => {
    return(
    
        <div 
            className={`flex min-w-0 flex-col gap-2 text-foreground text-[13px] leading-[1.65] w-fit max-w-[min(80%,56ch)] overflow-hidden break-words rounded-2xl rounded-br-lg border border-border/30 bg-gradient-to-br from-secondary to-muted px-3.5 py-2 shadow-[var(--shadow-card)] ${role === 'user' && 'ml-auto'}`} 
            data-testid="message-content"
        >
            <div 
                className="space-y-4 whitespace-normal *:first:mt-0 *:last:mb-0 size-full [&amp;&gt;*:first-child]:mt-0 [&amp;&gt;*:last-child]:mb-0"
            >
                <div 
                    className='prose prose-invert prose-sm sm:prose-base max-w-none prose-p:leading-relaxed prose-a:no-underline'
                >
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            a: ({ href, children }) => (
                            <a 
                                href={href} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
                            >
                                {children}
                            </a>
                        ),
                      }}
                    >
                       {content}
                    </ReactMarkdown>
                
                </div>
            </div>
        </div>
   
    )
}

const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]" />
      <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]" />
      <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
    </div>
  );
}

const Messages = () => {
    const { messages, isLoading } = useAIChatProvider();
    const scrollToRef = useRef<HTMLDivElement | null>(null);
    const isNearBottomRef = useRef(true);
    const containerRef = useRef<HTMLDivElement>(null);
    
    const handleScroll = () => {
        const el = containerRef.current;
        if (!el) return;
        const threshold = 100;
        isNearBottomRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
    };

    useEffect(()=>{
        if(isNearBottomRef.current){
            scrollToRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [isLoading, messages])

    if(!messages.length) return null
    return (
    <div 
        className="sticky bottom-0 z-1 mx-auto flex w-full max-w-4xl gap-2 border-t-0 bg-background px-2 pb-3 md:px-4 md:pb-4"
    >
        <div className={cn("relative flex h-[90dvh] w-[100%] mt-[20px] flex-col gap-4")}>
            <div 
                ref={containerRef} 
                onScroll={handleScroll} 
                className="flex-1 absolute pt-[10px] top-0 left-0 right-0 bottom-0 overflow-y-auto h-[68dvh] scroll-area space-y-[10px]"
            >
                {
                    messages.map(message => (
                        <div key={message.id}>
                            {
                                message.parts.map((part) => {
                                    switch (part.type){
                                        case "text":
                                            return (
                                                <MessageText role={message.role} content={part.text}/>
                                            )
                                        case "reasoning":
                                            return null
                                        case "tool-invocation":
                                            return <ToolRenderer parts={[part]} />
                                        case "source":
                                            return null
                                        case "file":
                                            return null
                                        case "step-start":
                                            return null
                                    }
                                })
                            }
                        </div>
                    ))
                }
                {
                    isLoading && <TypingIndicator />
                }
                <div ref={scrollToRef}/>
            </div>
            <div className="absolute bottom-0 w-full z-30 bg-inherit">
                <Form />
            </div>
          </div>
        </div>
  )
}

export default Messages