import { useEffect, useRef } from "react"

interface ScrollToDownProps {
    messages: Array<{
        role: string;
        content: string;
    }>
}
export const ScrollToDown = ({ messages } : ScrollToDownProps) => {
    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
	}
        useEffect(() => {
            scrollToBottom()
        }, [messages])
    return(
        <div ref={messagesEndRef} />
    )
}