import { BIRD_EYE_API_KEY } from "@/constants/api_keys";
import { TokenDetails, TokenResponse } from "./type";
import { getCachedDataOrFetch } from "@/lib/cache";
import { TOKEN_INFO_TTL } from "@/constants/constants";

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

        const response = await getCachedDataOrFetch({
            key: `token-info:${walletAddress}`,
            ttlSeconds: TOKEN_INFO_TTL,
            fetcher: async () => {
                const api = await fetch(
                    `https://public-api.birdeye.so/defi/token_overview?address=${walletAddress}&ui_amount_mode=scaled`,
                    options
                );
                const result = await api.json() as TokenResponse;

                if (!result.success) {
                    throw new Error(`Birdeye returned unsuccessful response for ${walletAddress}`);
                }
                return result;
            },
        });

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