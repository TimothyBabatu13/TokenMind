"use client";

import { useAIChatProvider } from "@/context/ai-chat-provider";
import { cn } from "@/lib/utils";
import Form from "./form";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useRef } from "react";
import { ToolRenderer } from "./tools";

const Markdown = ({ content } : {
    content: string
}) => {
    return(
    <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
            a: ({ href, children }) => (
                <a 
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 no-underline hover:underline"
                >
                    {children}
                </a>
            ),
            h2: ({ children }) => (
                <h2 className="mt-4 mb-2 max-w-[65ch] text-[11px] font-medium uppercase tracking-wide text-foreground/40 first:mt-0">
                    {children}
                </h2>
            ),
            table: ({ children }) => (
                <div className="my-3 w-full overflow-x-auto scroll-area rounded-lg border border-border/40">
                    <table className="w-max border-collapse text-[12.5px]">{children}</table>
                </div>
            ),
            thead: ({ children }) => (
                <thead className="bg-white/[0.04]">{children}</thead>
            ),
            th: ({ children }) => (
                <th 
                    className="whitespace-nowrap border-b border-border/40 px-2.5 py-2 text-left font-medium text-foreground/60"
                >
                    {children}
                </th>
            ),
            tr: ({ children }) => (
                <tr className="border-b border-border/30 last:border-0 even:bg-white/[0.015]">
                    {children}
                </tr>
            ),
            td: ({ children }) => (
                <td className="whitespace-nowrap px-2.5 py-2 align-top text-foreground/80">{children}</td>
            ),
            ol: ({ children }) => (
                <ol className="my-2 flex max-w-[65ch] flex-col gap-2 list-none pl-0">{children}</ol>
            ),
            ul: ({ children }) => (
                <ul className="my-2 flex max-w-[65ch] flex-col gap-1.5 list-none pl-0">{children}</ul>
            ),
            li: ({ children, ...props }) => {
                const isOrdered = "ordinal" in props;
                return (
                <li className="flex gap-2.5 text-[12.5px] text-foreground/80 leading-relaxed">
                    <span className="mt-0.5 shrink-0 text-teal-400">
                        {isOrdered ? (
                            <span 
                                className="flex size-[18px] items-center justify-center rounded-full bg-blue-400/15 text-[10px] font-medium text-blue-400"
                            >
                                {(props as any).ordinal}
                            </span>
                            ) : (
                            "•"
                            )
                        }
                    </span>
                <span>
                    {children}
                </span>
            </li>
        );
    },
    p: ({ children }) => (
        <p className="mb-2 max-w-[65ch] text-[13px] leading-relaxed text-foreground/80 last:mb-0">
            {children}
        </p>
    ),
    strong: ({ children }) => (
        <strong className="font-medium text-foreground">{children}</strong>
    ),
    }}
    >
        {content}
    </ReactMarkdown>
    )
}


const MessageText = ({ content, role } : {
    content: string,
    role: "system" | "user" | "assistant" | "data"
}) => {
    const isUser = role === "user";

    return(
    
        <div 
            className={cn(
                "flex min-w-0 flex-col gap-2 text-foreground text-[13px] leading-[1.65] break-words",
                isUser
                    ? "ml-auto w-fit max-w-[min(80%,56ch)] overflow-hidden rounded-2xl rounded-br-lg border border-border/30 bg-gradient-to-br from-secondary to-muted px-3.5 py-2 shadow-[var(--shadow-card)]"
                    : "w-full overflow-x-auto"
            )} 
            data-testid="message-content"
        >
            <div 
                className="space-y-4 whitespace-normal *:first:mt-0 *:last:mb-0 size-full [&amp;&gt;*:first-child]:mt-0 [&amp;&gt;*:last-child]:mb-0"
            >
                <div 
                    className='prose prose-invert prose-sm sm:prose-base max-w-none prose-p:leading-relaxed prose-a:no-underline'
                >
                    <Markdown content={content}/>
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
                        <div key={message.id} className={message.role === "user" ? "flex justify-end" : "w-full"}>
                            {
                                message?.parts?.map((part) => {
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