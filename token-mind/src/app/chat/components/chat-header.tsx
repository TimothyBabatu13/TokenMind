import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { HeaderRightButton } from "./header-right-component"
interface ChatHeaderProps {
    toggleSidebar: ()=>void
}
export const ChatHeader = ({ toggleSidebar } : ChatHeaderProps) => {
    return(
        <header className="p-4 border-b border-gray-800 flex items-center justify-between">
           <div className="flex items-center">
            <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={toggleSidebar} 
                    className="mr-2 cursor-pointer lg:hidden"
                >
                    <Menu className="h-5 w-5" />
                </Button>
                <h1 className="text-xl font-bold">TokenMind Chat</h1>
           </div>

            <HeaderRightButton />
        </header>
    )
}