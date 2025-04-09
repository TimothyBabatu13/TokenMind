import { Button } from "@/components/ui/button";

export function SidebarButton({ icon, text, propmt } : {
    icon: React.ReactNode,
    text: string,
    propmt?: string
}) {

    const handleSendMessage = () => {
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