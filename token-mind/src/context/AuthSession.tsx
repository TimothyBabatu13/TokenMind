'use client';

import { CivicAuthProvider } from "@civic/auth-web3/nextjs";
import { useRouter } from "next/navigation";

const AuthSession =  ({children } : {
    children: React.ReactNode
}) => {

  const handleSignIn = () : void => {
    const url = '/chat';
    const router = useRouter();
    router.push(url);
  }
  
  const handleSignout = () : void => {
    const url = '/';
    const router = useRouter();
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