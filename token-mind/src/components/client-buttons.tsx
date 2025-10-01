'use client'
import { Button } from "./ui/button";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export function GetStartedButton({ children, text } : {
    children?: React.ReactNode,
    text: string
}) {

  const handleSignIn = async () => {
    try {
      
    } catch (error) {
      console.log('error:',error)
    }
  }
  
  return (
    <div>

    <Button 
        className="cursor-pointer "
        onClick={handleSignIn}
    >
        {text}
        {children}
    </Button>
    <WalletMultiButton/>
    </div>
  );
};
