// import { useUser } from "@civic/auth-web3/react";

import { userHasWallet } from "@civic/auth-web3";
import { useUser } from "@civic/auth-web3/react";
import { Copy, User } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const UserInfo = () => {
    
    const userContext = useUser();
    const [walletAddress, setWalletAddress] = useState<string|null>(null);
    const getWalletAddress = () => {
      if(userHasWallet(userContext)){
        setWalletAddress(userContext.solana.address)
      }
    }

    const copyToClipBoard = async () => {
      if(walletAddress) {
        navigator.clipboard.writeText(walletAddress);
        toast("Event has been created.")
        console.log('hi')
      }
      
    }

    //17 characters
//3cgQdBdKQEVMdfnNFgjD2SAXPFsGb8HUEHT9GvXsCPxR

useEffect(()=>{
  console.log(userContext)
  getWalletAddress()
}, 
[userContext])
  return (
    <div className="flex items-center justify-between w-full">
      <div className="h-8 w-8 rounded-full bg-gray-700 mr-2 flex items-center justify-center">
        {/* <Image 
          height={16}
          width={16}
          src={userContext.user?.picture! || ''}
          alt="user"
        /> */}
        <User className="h-4 w-4" />
        </div>
        <span className="w-[130px] flex items-center truncate">
        {
          walletAddress ? walletAddress : 'user123'
        }
    </span>
    <Copy  
      role="button" 
      className="cursor-pointer"
      onClick={copyToClipBoard}
    />
</div>
    
  )
}
export default UserInfo