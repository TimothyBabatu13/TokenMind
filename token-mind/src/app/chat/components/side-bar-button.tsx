import { Button } from "@/components/ui/button";
import { useChatProvider } from "@/context/chat-context";

export function SidebarButton({ icon, text, propmt, toggleSidebar } : {
    icon: React.ReactNode,
    text: string,
    propmt: string,
    toggleSidebar: ()=>void
}) {

    const h = useChatProvider();
    const handleSendMessage = () => {
        toggleSidebar()
        console.log(propmt);
        h?.setText(propmt)
        //send dispatch down here to handle it
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