'use client'
import { useUser } from "@civic/auth-web3/react";
import { Button } from "./ui/button";

export function GetStartedButton({ children, text } : {
    children?: React.ReactNode,
    text: string
}) {
  const { signIn } = useUser();

  const handleSignIn = async () => {
    try {
      await signIn();
    } catch (error) {
      console.log('error:',error)
    }
  }
  
  return (
    <Button 
        className="cursor-pointer "
        onClick={handleSignIn}
    >
        {text}
        {children}
    </Button>
  );
};
