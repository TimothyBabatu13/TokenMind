// import { ProtectChat } from "@/components/server-page";
// import ChatPage from "./components/ChatPage";

import { AppSidebar } from "@/components/chat/app-side-bar";
import { ChatHeader } from "@/components/chat/chat-header"
import MultimodalInput from "@/components/chat/multimodal-input";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { Suspense } from "react";
import { Toaster } from "sonner";

// const Page = () => {
// 	return (
// 		<section>
// 			<ProtectChat />
// 			<ChatPage />
// 		</section>
// 	)
// }
// export default Page;

async function Page({ children }: { children: React.ReactNode }) {

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar  />
      <SidebarInset>
        <Toaster
          position="top-center"
          theme="system"
          toastOptions={{
            className:
              "!bg-card !text-foreground !border-border/50 !shadow-[var(--shadow-float)]",
          }}
        />
        <Suspense fallback={<div className="flex h-dvh" />}>
          {/* <ActiveChatProvider> */}
            <ChatShell />
          {/* </ActiveChatProvider> */}
        </Suspense>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

const ChatShell = () => {
  const messages = [];
  return (
	<SidebarProvider>
  
      <div className="flex h-dvh w-full flex-row overflow-hidden">
        <div
          className={cn(
            "flex min-w-0 flex-col bg-sidebar transition-[width] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
            // Boolean('isArtifactVisible') ? "w-[40%]" : "w-full"
          )}
        >
          <ChatHeader
            chatId={'chatId'}
            isReadonly={Boolean('isReadonly')}
            selectedVisibilityType={Boolean('visibilityType')}
          />

          

          <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-background md:rounded-tl-[12px] md:border-t md:border-l md:border-border/40">
            {/* <Messages
              addToolApprovalResponse={addToolApprovalResponse}
              chatId={chatId}
              isArtifactVisible={isArtifactVisible}
              isLoading={isLoading}
              isReadonly={isReadonly}
              messages={messages}
              onEditMessage={handleEditMessage}
              regenerate={regenerate}
              selectedModelId={currentModelId}
              setMessages={setMessages}
              status={status}
              votes={votes}
            /> */}

            <div className="sticky bottom-0 z-1 mx-auto flex w-full max-w-4xl gap-2 border-t-0 bg-background px-2 pb-3 md:px-4 md:pb-4">
              {!messages.length && (
                <MultimodalInput
                />
              )}
            </div>
          </div>
        </div>

        {/* <Artifact
          addToolApprovalResponse={addToolApprovalResponse}
          attachments={attachments}
          chatId={chatId}
          input={input}
          isReadonly={isReadonly}
          messages={messages}
          regenerate={regenerate}
          selectedModelId={currentModelId}
          selectedVisibilityType={visibilityType}
          sendMessage={sendMessage}
          setAttachments={setAttachments}
          setInput={setInput}
          setMessages={setMessages}
          status={status}
          stop={stop}
          votes={votes}
        /> */}
      </div>

      {/* <DataStreamHandler /> */}

    </SidebarProvider>
  )
}

export default Page