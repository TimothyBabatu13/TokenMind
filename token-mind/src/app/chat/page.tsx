import { ProtectChat } from "@/components/server-page";
import ChatPage from "./components/ChatPage";

const Page = () => {
	return (
		<section>
			<ProtectChat />
			<ChatPage />
		</section>
	)
}
export default Page;