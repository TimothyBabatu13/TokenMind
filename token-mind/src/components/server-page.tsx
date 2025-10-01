'use client';

import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";

export const ProtectChat = () => {
    const { connected } = useWallet()
    console.log(connected)
    useEffect(() =>{
        if(!connected){
            // router.push('/')
        }
    }, [connected])

    return(
        <div></div>
    )
}

export const TestOutMyScript = () => {

    return null
}