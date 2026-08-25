"use client"

import { LucideArrowUp } from "lucide-react"
import { Textarea } from "../ui/textarea"
import { useAIChatProvider } from "@/context/ai-chat-provider"
import { FormEvent, KeyboardEvent } from "react"

const Form = () => {
    
    const { isLoading, handleInputChange, input, handleSubmit, usage } = useAIChatProvider();
    
    const isUsageNotValid = usage?.remaining! < 1;

    const disbaledSubmit = isLoading || input.trim().length < 3 || isUsageNotValid
    
    const handleFormSubmit = (e: FormEvent) => {
        if(disbaledSubmit) return;
        e.preventDefault();
        handleSubmit()
    }
    
    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            if (e.shiftKey) {
                return;
            } else {
                e.preventDefault();
                if(disbaledSubmit) return;
                handleSubmit()
            }
        }
    }

  return (
    <form
        onSubmit={handleFormSubmit}
    >
        <div 
            className=" w-full rounded-md border border-input bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40"
        >
            {/*  */}
            <Textarea 
                className="bg-transparent! border-0 min-h-[96px]! max-h-[96px]! resize-none focus-visible:ring-0! w-full scroll-area"
                onChange={handleInputChange}
                value={input}
                onKeyDown={handleKeyDown}
            />

           <div className="flex items-center justify-end px-3 pb-4">
            <button
                className="group/button shrink-0 justify-center border border-transparent bg-clip-padding font-medium whitespace-nowrap outline-none select-none active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4 hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 flex items-center gap-2 text-sm shadow-none size-8 p-0 has-[&gt;svg]:p-0 h-7 w-7 rounded-xl transition-all duration-200 bg-foreground text-background hover:opacity-85 active:scale-95  disabled:cursor-not-allowed"
                type="submit"
                disabled={disbaledSubmit}
            >
                <LucideArrowUp />
            </button>
           </div>
        </div>
    </form>
  )
}

export default Form