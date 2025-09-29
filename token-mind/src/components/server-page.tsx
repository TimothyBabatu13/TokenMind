import { getUser } from "@civic/auth-web3/nextjs";
import { redirect } from "next/navigation";

export const ProtectChat =async  () => {
    const user = await getUser();
    if(!user){
        redirect('/');
    }
    return(
        <div></div>
    )
}

export const RedirectToChat = async () => {
    const user = await getUser();
    if(user){
        redirect('/chat');
    }
    return(
        <div />
    )
}