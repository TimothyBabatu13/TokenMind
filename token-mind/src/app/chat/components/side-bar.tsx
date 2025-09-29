import Logo from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, LogOut, Repeat, Search, Settings, TrendingUp, X } from "lucide-react"
import { SidebarButton } from "./side-bar-button"
import UserInfo from "./user-info"
import { useUser } from "@civic/auth-web3/react"
import { userHasWallet } from "@civic/auth-web3"
import { useEffect } from "react"
import { ChatRequestOptions, CreateMessage, Message } from "ai"

export type append = (message: Message | CreateMessage, chatRequestOptions?: ChatRequestOptions) => Promise<string | null | undefined>

export const SideBar = ({ sidebarOpen, toggleSidebar, append } : {
    sidebarOpen: boolean,
    toggleSidebar: ()=>void,
    append: append
}) => {
   
    const userContext = useUser();
    
    const handleLogOut = async () => {
      userContext.signOut();
    }

    
    const createWallet = async () => {
      // console.log(userContext.user)
      if (userContext.user && !userHasWallet(userContext)) {
        await userContext.createWallet();
 
      }
      if(userHasWallet(userContext)){
        // userContext.solana.wallet;
        // userContext.solana.wallet.connect();
        // setWalletAddress(userContext.solana.address)
      }
    }

    useEffect(()=>{
      createWallet()
    }, [userContext])

    
    return(
    <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[black] transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e)=>{
          e.stopPropagation()
        }}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r  flex items-center justify-center">
                <Logo />
                {/* <span className="font-bold text-sm">A</span> */}
              </div>
              <span className="font-bold">TokenMind</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar} 
              className="lg:hidden cursor-pointer"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="features" className="flex-1 flex flex-col">
            <TabsList className="grid grid-cols-2 mx-4 mt-4">
              <TabsTrigger className="cursor-pointer" value="features">Features</TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="flex-1 p-4 space-y-2">
              <SidebarButton 
                toggleSidebar={toggleSidebar}
                icon={<TrendingUp className="h-5 w-5 text-white" />} 
                text="Trending Tokens" 
                propmt="What are the trending tokens?"
                append={append}
              />
              <SidebarButton 
                icon={<Search className="h-5 w-5 text-white" />} 
                text="Search Tokens"
                toggleSidebar={toggleSidebar} 
                propmt="I want to search about a token"
                append={append}
                />
              <SidebarButton 
                icon={<BarChart3 
                className="h-5 w-5 text-white" />} 
                text="X Trending News" 
                toggleSidebar={toggleSidebar}
                propmt="Tell me what is trending on X"
                append={append}
                />
              <SidebarButton 
                icon={<Repeat className="h-5 w-5 text-white" />} 
                text="Token Swap" 
                toggleSidebar={toggleSidebar}
                propmt="I want to swap token"
                append={append}
                />
            </TabsContent>

            <TabsContent value="history" className="flex-1 p-4 space-y-2">
              <p className="text-gray-400 text-sm text-center py-4">Your chat history will appear here</p>
            </TabsContent>
          </Tabs>

          {/* User Section */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <UserInfo />
            </div>
            <div className="flex gap-2 text-black">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 border-gray-700 cursor-pointer"
              >
                <Settings className="h-4 w-4 mr-1" /> Settings
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 border-gray-700 cursor-pointer"
                onClick={handleLogOut}
              >
                <LogOut className="h-4 w-4 mr-1" /> Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

    )
}