"use client"

import { useState, useEffect, FormEvent } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useMediaQuery } from "@/hooks/use-media-query"
import { SideBar } from "./components/side-bar"
import { useChatProvider } from "@/context/chat-context"
import { ThinkingView, ViewMessage } from "./components/messages-components"
import { ChatHeader } from "./components/chat-header"
import { ScrollToDown } from "./components/scroll-to-bottom"


 const ChatPage = () => {
	const chatProvider = useChatProvider();
	const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
	const [thinking, setIsThinking] = useState<boolean>(false)
	const [messages, setMessages] = useState([
		{
			role: "assistant",
			content:
				"Hi there! I'm your TokenAI assistant. How can I help you today? You can ask me about trending tokens, search for specific tokens, check news, or swap tokens.",
		},
	])
	const [inputValue, setInputValue] = useState<string>("")
	const isDesktop = useMediaQuery("(min-width: 1024px)")

	useEffect(() => {
		if (isDesktop) {
			setSidebarOpen(false)
		}
	}, [isDesktop])

	
	useEffect(()=>{
		if(chatProvider?.text.length){
			SendMessage(chatProvider.text)
			chatProvider.setText('');
		}
	}, [chatProvider])

	const SendMessage = (inputValue: string) => {
		// Add user message
		setMessages([...messages, { role: "user", content: inputValue }])
		setIsThinking(true);
		// Simulate AI response
		setTimeout(() => {
			let response
			const lowercaseInput = inputValue.toLowerCase()

			if (lowercaseInput.includes("trending") || lowercaseInput.includes("popular")) {
				response =
					"Here are the trending tokens right now:\n\n1. ETH: $3,245 (+5.2%)\n2. SOL: $142 (+8.7%)\n3. AVAX: $38.5 (+3.1%)\n4. ARB: $1.85 (+12.3%)\n5. MATIC: $0.78 (+2.5%)"
			} else if (lowercaseInput.includes("search") || lowercaseInput.includes("find")) {
				response = "What token would you like me to search for? Please provide the token name or symbol."
			} else if (
				lowercaseInput.includes("news") ||
				lowercaseInput.includes("twitter") ||
				lowercaseInput.includes("x")
			) {
				response =
					"Latest trending news from X:\n\n• Ethereum Layer 2 solutions seeing record adoption this week\n• New DEX launching with zero-fee trading for first month\n• Major update coming to Solana ecosystem next week"
			} else if (lowercaseInput.includes("swap") || lowercaseInput.includes("exchange")) {
				response =
					"I can help you swap tokens. Please specify which tokens you'd like to swap (e.g., 'Swap 0.5 ETH to USDT')."
			} else {
				response =
					"I'm here to help with crypto tokens! You can ask me to:\n• Show trending tokens\n• Search for a specific token\n• Check trending news on X\n• Swap between tokens"
			}
			setIsThinking(false)
			setMessages((prev) => [...prev, { role: "assistant", content: response }])
		}, 1000)

	}
	const handleSendMessage = (e : FormEvent) => {
		e.preventDefault()
		if (!inputValue.trim()) return

		// Add user message
		SendMessage(inputValue);
		setInputValue("")
	}

	const toggleSidebar = () => {
		setSidebarOpen(prev => !prev)
	}

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex">

			<SideBar 
				sidebarOpen={sidebarOpen} 
				toggleSidebar={toggleSidebar}
			/>

			<div className="flex-1 flex flex-col max-h-[100vh] overflow-y-hidden">
				<ChatHeader 
					toggleSidebar={toggleSidebar}
				/>

				<ScrollArea className="flex-1 p-4 overflow-y-scroll scroll-area">
					<div className="max-w-3xl mx-auto space-y-6">
						<ViewMessage messages={messages}/>
						{
							thinking && <ThinkingView />
						}
						<ScrollToDown messages={messages}/>
					</div>
				</ScrollArea>

				{/* Input Area */}
				<div className="p-4 border-t border-gray-800">
					<form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex gap-2">
						<Input
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
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