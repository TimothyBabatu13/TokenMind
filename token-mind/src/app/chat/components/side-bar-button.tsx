import { Button } from "@/components/ui/button";
import { useChat } from "@ai-sdk/react";

export function SidebarButton({ icon, text, propmt, toggleSidebar } : {
    icon: React.ReactNode,
    text: string,
    propmt: string,
    toggleSidebar: ()=>void
}) {

    const { append } = useChat();
    
    const handleSendMessage = () => {
        toggleSidebar()
        append({content: propmt, role: 'user'})
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