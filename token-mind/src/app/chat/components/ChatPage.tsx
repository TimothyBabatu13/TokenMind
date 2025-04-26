"use client"

import { useState, useEffect } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useMediaQuery } from "@/hooks/use-media-query"
// import { useChatProvider } from "@/context/chat-context"
import { SideBar } from "./side-bar"
import { ChatHeader } from "./chat-header"
import { ViewMessage } from "./messages-components"
import { ScrollToDown } from "./scroll-to-bottom"
import { useChat } from "@ai-sdk/react"
import { UseGetWalletAddress } from "@/hooks/use-civic-wallet"

 const ChatPage = () => {

    const wallet = UseGetWalletAddress();
    const USER_WALLET_ADDRESS = typeof wallet == 'string' ? wallet : '';

    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
   
    const { messages, handleSubmit, handleInputChange, input } = useChat({api: `/api/chat?walletAddress=${USER_WALLET_ADDRESS}`})
    
    const isDesktop = useMediaQuery("(min-width: 1024px)")

    useEffect(() => {
        if (isDesktop) {
            setSidebarOpen(false)
        }
    }, [isDesktop])

    

    // console.log(messages)
    

    const toggleSidebar = () => {
        setSidebarOpen(prev => !prev)
    }

    const handleCloseSideBar = () => {
        if(!sidebarOpen) return
        setSidebarOpen(false)
    }
    return (
        <div className="h-screen max-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex"
            onClick={handleCloseSideBar}
        >

            <SideBar 
                sidebarOpen={sidebarOpen} 
                toggleSidebar={toggleSidebar}
            />

            <div className="flex-1 flex flex-col  overflow-y-hidden">
                <ChatHeader 
                    toggleSidebar={toggleSidebar}
                />

                <ScrollArea className="flex-1 p-4 overflow-y-scroll max-h-[100%] scroll-area">
                    <div className="max-w-3xl mx-auto ">
                        <ViewMessage messages={messages}/>
                        <ScrollToDown messages={messages}/>
                    </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="p-4 border-t border-gray-800">
                    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-2">
                        <Input
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Ask about tokens, trends, news, or swaps..."
                            className="bg-gray-800 border-gray-700 focus-visible:ring-purple-500"
                        />
                        <Button
                            type="submit"
                            className="bg-gradient-to-r cursor-pointer from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                        >
                            <Send className="h-5 w-5" />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default ChatPage;



// 'use client';

// import { useChat } from '@ai-sdk/react';

// export default function Page() {
//   const { messages, input, handleSubmit, handleInputChange, status } =
//     useChat();

//   return (
//     <div>
//       {messages.map(message => (
//         <div key={message.id}>
//           <strong>{`${message.role}: `}</strong>
//           {message.parts.map((part, index) => {
//             switch (part.type) {
//               case 'text':
//                 return <span key={index}>{part.text}</span>;

//               // other cases can handle images, tool calls, etc
//             }
//           })}
//         </div>
//       ))}

//       <form onSubmit={handleSubmit}>
//         <input
//           value={input}
//           placeholder="Send a message..."
//           onChange={handleInputChange}
//           disabled={status !== 'ready'}
//         />
//       </form>
//     </div>
//   );
// }