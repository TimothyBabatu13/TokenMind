import ChatContext from "@/context/chat-context";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ChatContext>
        {children}
    </ChatContext>  
    
  );
}
