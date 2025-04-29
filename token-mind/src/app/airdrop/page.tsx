'use client';

import { Button } from "@/components/ui/button";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { useEffect } from "react";

const WALLET = "3cgQdBdKQEVMdfnNFgjD2SAXPFsGb8HUEHT9GvXsCPxR"
const page = () => {
    const readAccountBalance = async () => {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const publicKey = new PublicKey(WALLET);

        const balance = await connection.getBalance(publicKey);
        console.log(balance)
        console.log('completed')
    }

    useEffect(()=>{
        readAccountBalance();
    }, [])
    const requestForAirdrop = async () => {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const publicKey = new PublicKey(WALLET);
        const airdropSignature = await connection.requestAirdrop(
            publicKey,
            1 * 1_000_000_000 // 1 SOL
          );
          await connection.confirmTransaction(airdropSignature, "confirmed");
          alert('Airdop completed')
        console.log(`Airdrop complete! Tx signature: ${airdropSignature}`);
    }
  return (
    <form className="flex flex-col items-center justify-center h-full">
        <Button onClick={(e) =>{
            e.preventDefault()
            
            requestForAirdrop()
        }} className="my-10 cursor-pointer">
            Request For Airdrop
        </Button>
        <p>Airdrop Request</p>
    </form>
  )
}

export default page