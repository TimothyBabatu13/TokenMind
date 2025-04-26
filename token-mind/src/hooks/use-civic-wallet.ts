'use client';
import { SOLANA_RPC } from "@/lib/utils";
import { userHasWallet } from "@civic/auth-web3";
import { useUser } from "@civic/auth-web3/react";
import { Connection } from "@solana/web3.js";
import { useEffect, useState } from "react"

export const UseGetWalletAddress = () => {
    const [wallet, setWalletAddress] = useState<null | string>(null);
    const userProvider = useUser();
    const { user } = userProvider;
    const getWalletAddress =  () => {
        if(userHasWallet(userProvider)){
            if(userProvider.solana.wallet.publicKey){
                const walletAddress = userProvider.solana.wallet.publicKey.toBase58();
                setWalletAddress(walletAddress);
            }
        }
    }

    useEffect(()=>{
        getWalletAddress();
    }, [user])

    if(typeof wallet == 'string') return wallet;
}

export const UseGetWalletBalance = () => {
  const [walletBalance, setWalletBalance] = useState<null | number>(null);
  const userContext = useUser();
  const connection =  new Connection(SOLANA_RPC);

  const getWalletBalance = async () => {
    if(userHasWallet(userContext)){
      if(userContext.solana.wallet.publicKey){
        const publicKey = userContext.solana.wallet.publicKey;
        const balance = await connection.getBalance(publicKey);
        setWalletBalance(balance);
      }
    }
  }

  useEffect(()=>{
    getWalletBalance();
  }, [])

  return walletBalance;
}