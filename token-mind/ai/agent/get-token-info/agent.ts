import { BIRD_EYE_API_KEY } from "@/constants/api_keys";
import { TokenDetails, TokenResponse } from "./type";

const options = {
  method: 'GET',
  headers: {
    'x-chain': 'solana',
    accept: 'application/json',
    'X-API-KEY': BIRD_EYE_API_KEY
  }
};

export const getTokenInfo = async ({ walletAddress } :  {
    walletAddress: string
}) => {
    
    if(!walletAddress){
        return {
            message: 'Please provide wallet address for the token you want to get information on.'
        }
    }
    
    try {

        const api = await fetch(`https://public-api.birdeye.so/defi/token_overview?address=${walletAddress}&ui_amount_mode=scaled`, options)
        const response = await api.json() as TokenResponse
        
        return {
            message: 'Found Information about this token The user is shown the token, do not list it. Ask the user what they want to do with the coin.',
            body: {
                response
            }
        }
        
    } catch (error) {
        return {
            message: 'There is an error finding the details for the token '+ walletAddress,
        }
    }
}