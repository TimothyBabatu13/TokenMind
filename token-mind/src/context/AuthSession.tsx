'use client';
import { useUser } from "@civic/auth-web3/react";

const AuthSession =  ({children } : {
    children: React.ReactNode
}) => {

    const user = useUser();
    if(user) {
        // console.log(user)
        // redirect('/chat');
        
    }
    
  return (
    <div>
        {children}
    </div>
  )
}

export default AuthSession