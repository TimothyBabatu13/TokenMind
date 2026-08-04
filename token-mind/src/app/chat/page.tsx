import AppProvider from "@/context/app-provider";
import ChatShell from "@/components/chat/chat-shell";


// const Page = () => {
// 	return (
// 		<section>
// 			<ProtectChat />
			// <ChatPage />
// 		</section>
// 	)
// }
// export default Page;

function Page() {
  return (
    <AppProvider>
      <ChatShell/>
    </AppProvider>
  );
}

export default Page