'use client'
import { useUser } from "@civic/auth-web3/react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function GetStartedButton({ children, text } : {
    children?: React.ReactNode,
    text: string
}) {
  const { signIn } = useUser();
  const navigate = useRouter();
  const handleSignIn = async () => {
    try {
      await signIn();
      toast('Sign in successful');
    } catch (error) {
      console.log('error:',error)
    }
  }
  
  return (
    <Button 
        className="cursor-pointer bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
        onClick={handleSignIn}
    >
        {text}
        {children}
    </Button>
  );
};
