'use client';

import { CivicAuthProvider } from "@civic/auth-web3/nextjs";
import { useRouter } from "next/navigation";

const AuthSession =  ({children } : {
    children: React.ReactNode
}) => {

  const router = useRouter();

  const handleSignIn = () : void => {
    const url = '/chat';  
    router.push(url);
  }
  
  const handleSignout = () : void => {
    const url = '/';
    router.replace(url);
  }

  return (
    <CivicAuthProvider 
      onSignIn={(error) => {
        if(error){
          console.log(error);
        }
        else{
          handleSignIn();
        }
      }}
      onSessionEnd={handleSignout}
      >
        {children}
    </CivicAuthProvider>
  )
}

export default AuthSession