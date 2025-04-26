import { SOLANA_RPC } from "@/lib/utils";
import { Connection, PublicKey } from "@solana/web3.js"

export const getTokenInfo = ({ walletAddress } : {
    walletAddress: string
}): Promise<string> => {
    const connection = new Connection(SOLANA_RPC);
    const publicKey = new PublicKey(walletAddress);
    
    console.log(connection, publicKey)
    return Promise.resolve('This feature is coming')
}