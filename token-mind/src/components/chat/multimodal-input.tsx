"use client";

import { cn } from "@/lib/utils"
import { ComponentProps, useCallback } from "react";
import { Button } from "../ui/button";

const suggestedActions = [
  "What are the advantages of using Next.js?",
  "Write code to demonstrate Dijkstra's algorithm",
  "Help me write an essay about Silicon Valley",
  "What is the weather in San Francisco?",
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
     const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      window.history.pushState(
        {},
        "",
  
      );
    //   sendMessage({
    //     parts: [{ text: suggestion, type: "text" }],
    //     role: "user",
    //   });
    },
    []
  );
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
      {suggestedActions.map((suggestedAction, index) => (
        <div
        //   animate={{ opacity: 1, y: 0 }}
          className="min-w-[200px] shrink-0 sm:min-w-0 sm:shrink"
        
          key={suggestedAction}
         
        >
          <Suggestion
            className="h-auto w-full whitespace-nowrap rounded-xl border border-border/50 bg-card/30 px-4 py-3 text-left text-[12px] leading-relaxed text-muted-foreground transition-all duration-200 sm:whitespace-normal sm:p-4 sm:text-[13px] hover:-translate-y-0.5 hover:bg-card/60 hover:text-foreground hover:shadow-[var(--shadow-card)]"
            onClick={handleSuggestionClick}
            suggestion={suggestedAction}
          >
            {suggestedAction}
          </Suggestion>
        </div>
      ))}
    </div>
    )
}

const MultimodalInput = ({ className }:{
    className?: string
}) => {
  return (
    <div className={cn("relative flex w-[100%] bg-amber-200 flex-col gap-4", className)}>
       <SuggestedActions />
    </div>
  )
}

export default MultimodalInput