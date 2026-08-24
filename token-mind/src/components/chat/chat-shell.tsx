import { cn } from "@/lib/utils";
import { PureChatHeader } from "./chat-header";
import ChatContainer from "./chat-container";

const ChatShell = () => {
     
    return (
    <>
  
      <div className="flex h-dvh w-full flex-row overflow-hidden">
        <div
          className={cn(
            "flex min-w-0 flex-col bg-sidebar transition-[width] w-full duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
          )}
        >
          <PureChatHeader />
          <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-background md:rounded-tl-[12px] md:border-t md:border-l md:border-border/40">
            <ChatContainer />
          </div>
        </div>

      </div>

    </>
  )
}

export default ChatShell