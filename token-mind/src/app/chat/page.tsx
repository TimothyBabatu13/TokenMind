export const dynamic = "force-dynamic";

import AppProvider from "@/context/app-provider";
import ChatShell from "@/components/chat/chat-shell";

function Page() {
  return (
    <AppProvider>
      <ChatShell/>
    </AppProvider>
  );
}

export default Page