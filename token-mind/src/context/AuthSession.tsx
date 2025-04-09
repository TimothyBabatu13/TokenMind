'use client';
// import { useUser } from "@civic/auth-web3/react";

const AuthSession =  ({children } : {
    children: React.ReactNode
}) => {

    // const user = useUser();
  return (
    <div>
        {children}
    </div>
  )
}

export default AuthSession