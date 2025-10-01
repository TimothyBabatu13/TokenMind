"use client";

import {
  ConnectionProvider,
  WalletProvider
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import { useMemo } from "react";


const WalletAdapter = ({ children }:{
    children: React.ReactNode
}) => {

    const environment = process.env.NODE_ENV === 'development' ? 'This is a development thing' : 'This is a production thing';
    const network = process.env.NODE_ENV === 'development' ? WalletAdapterNetwork.Devnet : WalletAdapterNetwork.Mainnet;

    console.log(environment)
    
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default WalletAdapter