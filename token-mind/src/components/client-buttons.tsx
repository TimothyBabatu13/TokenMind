'use client'
import { useUser } from "@civic/auth-web3/react";
import { Button } from "./ui/button";

export function GetStartedButton() {
  const { signIn } = useUser();
  const handleSignIn = async () => {
    await signIn()
  }
  return (
    <Button 
        className="cursor-pointer bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
        onClick={handleSignIn}
    >
        Get Started
    </Button>
  );
};
