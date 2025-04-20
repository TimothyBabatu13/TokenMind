import { Button } from "@/components/ui/button";
import { useChatProvider } from "@/context/chat-context";
import { useChat } from "@ai-sdk/react";

export function SidebarButton({ icon, text, propmt, toggleSidebar } : {
    icon: React.ReactNode,
    text: string,
    propmt: string,
    toggleSidebar: ()=>void
}) {

    const { handleSubmit } = useChat();
    // const h = useChatProvider();
    const handleSendMessage = () => {
        toggleSidebar()
        // console.log(propmt);
        // h?.setText(propmt)
        //send dispatch down here to handle it
        // handleSubmit(propmt)
        console.log(propmt)
    }
    return (
      <Button 
            variant="ghost" 
            className="w-full justify-start cursor-pointer"
            onClick={handleSendMessage}
        >
            <div className="mr-2 text-purple-400">{icon}</div>
            <span>{text}</span>
      </Button>
    )
  }