import Logo from "@/components/Logo"
import { cn } from "@/lib/utils"
import { CSSProperties, FC, ReactNode } from "react"

interface AnimatedShinyTextProps {
    children: ReactNode;
    className?: string;
    shimmerWidth?: number;
  }
const AnimatedShinyText = ({children,className,shimmerWidth = 100} : AnimatedShinyTextProps) => {
    return(
        <p
      style={
        {
          "--shiny-width": `${shimmerWidth}px`,
        } as CSSProperties
      }
      className={cn(
        "text-white dark:text-neutral-400/70 w-fit",

        // Shine effect
        "animate-shiny-text bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shiny-width)_100%] [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]",

        // Shine gradient
        "bg-gradient-to-r from-transparent via-black/80 via-50% to-transparent  dark:via-white/80",

        className,
      )}
    >
      {children}
    </p>
    )
}

export const LoadingMessage = () => {
    return(
        <div className={cn(
            "flex w-full px-2 py-4 max-w-full last:border-b-0 items-center gap-4 text-white"
        )}>
            <div className="">
                <Logo />
            </div>
            <div className="w-full max-w-full">
                <AnimatedShinyText
                    className="text-sm font-semibold text-left mx-0 w-fit"
                    shimmerWidth={70}
                >
                    Thinking...
                </AnimatedShinyText>
            </div>
        </div>
    )
}