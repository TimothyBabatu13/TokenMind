'use client';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useUser } from "@civic/auth-web3/react";
import { Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { userHasWallet } from "@civic/auth-web3";
import { Connection } from "@solana/web3.js";
import { shortenWalletAddress } from "@/hooks/use-shorten-wallet";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export const HeaderRightButton = () => {

    const navigate = useRouter();
    const SOLANA_RPC = "https://api.devnet.solana.com"
    const userContext = useUser();
    const { user, signOut } = userContext;
    const [walletBalance, setWalletBalance] = useState<undefined | number>(undefined);
    const [walletAddress, setWalletAddress] = useState<string | undefined>(undefined);
    const handleLogOut = async () => {
      await signOut();
      toast('Logout successful');
      navigate.push('/')
    }
    

    useEffect(()=>{
      const getUserBalance = async () => {
        if(userHasWallet(userContext)){
          if(userContext.solana){
            const { publicKey } = userContext.solana.wallet;
      
            const conncetion = new Connection(SOLANA_RPC);
            if(publicKey){
              setWalletAddress(publicKey.toBase58());
              const balance = await conncetion.getBalance(publicKey)
              setWalletBalance(balance)
            }
          }
        }
      }

      getUserBalance();

    }, [user])

  return(    
      <div className="flex items-center p-6 rounded-[32px] gap-3">
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="flex cursor-pointer hover-card items-center gap-4 border border-[#0C0C4F] rounded-[4px] p-2">
              <Wallet />
              <span className="text-base font-bold">{
                typeof walletBalance ===  'number' ? `${walletBalance} SOL` : <Skeleton className="w-[74.8438px] h-[24px]"/>
              }</span>
            </div>
          </HoverCardTrigger>
          <HoverCardContent>
            Your wallet balance is {
              typeof walletBalance === 'number' ? `${walletBalance} SOL` : <Skeleton className="w-[74.8438px] h-[24px]"/>
            }
          </HoverCardContent>
        </HoverCard>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="h-10 w-10 rounded-full cursor-pointer">
              {
                user ? (<img 
                  src={user?.picture || '/user.png'} 
                  alt="user image" 
                  className="rounded-full h-10 w-10"
                  draggable={false}
                  />) : (<div>
                    <Skeleton className="h-10 w-10 rounded-full"/>
                  </div>)
              }
              
          </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mr-8">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() =>{
                if(typeof walletAddress ===  'string'){
                  navigator.clipboard.writeText(walletAddress);
                  toast("Wallet address copied");
                }
              }}>
                Wallet
                <DropdownMenuShortcut>
                  {
                    typeof walletAddress === 'string' ? shortenWalletAddress(walletAddress) : <Skeleton className="w-[74.8438px] h-[24px]"/>
                  }
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem disabled className="balance">
                Balance
                <DropdownMenuShortcut>
                  {
                    typeof walletBalance ===  'number' ? `${walletBalance} SOL` : <Skeleton className="w-[74.8438px] h-[24px]"/>
                  }
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuItem onClick={handleLogOut}>
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    
  )
}