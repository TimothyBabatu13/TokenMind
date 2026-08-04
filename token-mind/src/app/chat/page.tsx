import MultimodalInput from "@/components/chat/multimodal-input";
import AppProvider from "@/context/app-provider";
import { cn } from "@/lib/utils"
import { PureChatHeader } from "@/components/chat/chat-header";


// const Page = () => {
// 	return (
// 		<section>
// 			<ProtectChat />
// 			<ChatPage />
// 		</section>
// 	)
// }
// export default Page;

function Page() {
  return (
    <AppProvider>
      <ChatShell />
    </AppProvider>
  );
}

const ChatShell = () => {
  const messages = [];
  return (
	<>
  
      <div className="flex h-dvh w-full flex-row overflow-hidden">
        <div
          className={cn(
            "flex min-w-0 flex-col bg-sidebar transition-[width] w-full duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
          )}
        >
          <PureChatHeader />

          

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

    </>
  )
}

export default Page