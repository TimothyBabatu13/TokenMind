import Logo from "@/components/Logo"
import { LoadingMessage } from "./thinking-components";

interface ViewMessageProps {
    messages: Array<{
        role: string;
        content: string;
    }>
}
export const ViewMessage = ({ messages }: ViewMessageProps) => {
    return(
        <div>
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-2xl p-4 ${
                message.role === "user" ? "bg-purple-600 rounded-tr-none" : "bg-gray-800 rounded-tl-none"
              }`}
            >
              {message.role === "assistant" && (
                <div className="flex items-center mb-2">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center mr-2">
                    <Logo />
                  </div>
                  <span className="text-sm font-medium">TokenAI</span>
                </div>
              )}
              <p className="whitespace-pre-line">{message.content}</p>
            </div>
          </div>
        ))}
      </div>
    )
}

export const ThinkingView = () => {
    return(
        <LoadingMessage />
    )
}