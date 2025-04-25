'use client';

import { userHasWallet } from "@civic/auth-web3";
import { useUser } from "@civic/auth-web3/react";
import { useState } from "react";

export const useGetUsersBalance = () => {
     const userContext = useUser();
      const [userBalance, setUserBalance] = useState<undefined | string>(undefined);
      const getUserBalance = () => {
        if(userHasWallet(userContext)){
          if(userContext.solana){
            const { publicKey } = userContext.solana.wallet;
            setUserBalance(publicKey?.toString());
          }
        }
      }
      getUserBalance();
      return userBalance;
}
