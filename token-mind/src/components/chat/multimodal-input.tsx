"use client";

import { cn } from "@/lib/utils"
import { ComponentProps, useCallback } from "react";
import { Button } from "../ui/button";
import Form from "./form";
import { useAIChatProvider } from "@/context/ai-chat-provider";

type SuggestedAction = {
  text: string;
  intent?: "trending_tokens";
};

const suggestedActions: SuggestedAction[] = [
  { text: "What's trending on Solana right now?", intent: "trending_tokens" },
  { text: "How does staking work on Solana?" },
  { text: "Tell me about this token" },
  { text: "What's trending on crypto Twitter today?" },
];

 export type SuggestionProps = Omit<ComponentProps<typeof Button>, "onClick"> & {
  suggestion: string;
  onClick?: (suggestion: string) => void;
};

 export const Suggestion = ({
  suggestion,
  onClick,
  className,
  variant = "outline",
  size = "sm",
  children,
  ...props
}: SuggestionProps) => {
  const handleClick = useCallback(() => {
    onClick?.(suggestion);
  }, [onClick, suggestion]);

  return (
    <Button
      className={cn("cursor-pointer rounded-full px-4", className)}
      onClick={handleClick}
      size={size}
      type="button"
      variant={variant}
      {...props}
    >
      {children || suggestion}
    </Button>
  );
};

const SuggestedActions = () => {
  
  const { append, usage, isLoading } = useAIChatProvider();


  const isUsageNotValid = usage?.remaining! < 1
  const isButtonDisabled = isLoading || isUsageNotValid;

  const handleSuggestionClick = async (action: SuggestedAction) => {
    if(isButtonDisabled) return;
    await append(
      { role: "user", content: action.text },
      action.intent ? { body: { intent: action.intent } } : undefined
    );
  }
  
  return(
  <div
    className="flex w-full gap-2.5 overflow-x-auto pb-1 sm:grid sm:grid-cols-2 sm:overflow-visible"
    data-testid="suggested-actions"
    style={{
      msOverflowStyle: "none",
      scrollbarWidth: "none",
      WebkitOverflowScrolling: "touch",
    }}
  >
    {suggestedActions.map((suggestedAction) => (
      <div
        className="min-w-[200px] shrink-0 sm:min-w-0 sm:shrink"
        key={suggestedAction.text}
      >
        <Suggestion
          className="h-auto w-full whitespace-nowrap rounded-xl border border-border/50 bg-card/30 px-4 py-3 text-left text-[12px] leading-relaxed text-muted-foreground transition-all duration-200 sm:whitespace-normal sm:p-4 sm:text-[13px] hover:-translate-y-0.5 hover:bg-card/60 hover:text-foreground hover:shadow-[var(--shadow-card)]  disabled:cursor-not-allowed"
          onClick={()=>{handleSuggestionClick(suggestedAction)}}
          suggestion={suggestedAction.text}
          disabled={isButtonDisabled}
        >
          {suggestedAction.text}
        </Suggestion>
        </div>
      ))}
    </div>
    )
}

const MultiModalHeading = () => {
    return(
        <div 
          className="pointer-events-none inset-0 z-10 flex items-center justify-center"
        >
          <div 
            className="flex flex-col items-center px-4"
          >
            <div 
              className="text-center font-semibold text-2xl tracking-tight text-foreground md:text-3xl" style={{"opacity": "1", "transform": "none"}}
            >
              What can I help with?
            </div>
            <div 
              className="mt-3 text-center text-muted-foreground/80 text-sm" 
              style={{"opacity": "1", "transform": "none"}}
            >
              Ask about a token, check what's trending, or swap and create tokens — all in one place.
            </div>
          </div>
        </div>
    )
}

const MultimodalInput = ({ className }:{
    className?: string
}) => {
  const { messages } = useAIChatProvider()
  if(messages.length) return null
  return (
    <div 
      className="sticky bottom-0 z-1 mx-auto flex w-full max-w-4xl gap-2 border-t-0 bg-background px-2 pb-3 md:px-4 md:pb-4"
    >
      <div className={cn("relative flex h-[90dvh] w-[100%] flex-col gap-4", className)}>
        <div className="flex-1 mt-[200px]">
          <MultiModalHeading />
        </div>
        <SuggestedActions />
        <Form />
      </div>
    </div>
  )
}

export default MultimodalInput