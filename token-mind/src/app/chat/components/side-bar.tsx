import Logo from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, LogOut, Repeat, Search, Settings, TrendingUp, User, X } from "lucide-react"
import { SidebarButton } from "./side-bar-button"

export const SideBar = ({ sidebarOpen, toggleSidebar } : {
    sidebarOpen: boolean,
    toggleSidebar: ()=>void
}) => {
    return(
    <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center">
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
                icon={<TrendingUp className="h-5 w-5" />} 
                text="Trending Tokens" 
              />
              <SidebarButton icon={<Search className="h-5 w-5" />} text="Search Tokens" />
              <SidebarButton icon={<BarChart3 className="h-5 w-5" />} text="X Trending News" />
              <SidebarButton icon={<Repeat className="h-5 w-5" />} text="Token Swap" />
            </TabsContent>

            <TabsContent value="history" className="flex-1 p-4 space-y-2">
              <p className="text-gray-400 text-sm text-center py-4">Your chat history will appear here</p>
            </TabsContent>
          </Tabs>

          {/* User Section */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-700 mr-2 flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
                <span>User123</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 border-gray-700">
                <Settings className="h-4 w-4 mr-1" /> Settings
              </Button>
              <Button variant="outline" size="sm" className="flex-1 border-gray-700">
                <LogOut className="h-4 w-4 mr-1" /> Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

    )
}