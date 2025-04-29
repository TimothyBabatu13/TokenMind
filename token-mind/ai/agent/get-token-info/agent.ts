import { TokenDetails } from "./type";

export const getTokenInfo = async ({ walletAddress } :  {
    walletAddress: string
}) => {
    
    if(!walletAddress){
        return {
            message: 'Please provide wallet address for the token you want to get information on.'
        }
    }
    const moralisApiKey = process.env.MORALIS_API_KEY!
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'X-API-Key': moralisApiKey
        },
    };
    
    try {
        
        const api = await fetch(`https://solana-gateway.moralis.io/token/mainnet/${walletAddress}/metadata`, options)
        const res: TokenDetails = await api.json();
        return {
            message: 'Found Information about this token The user is shown the token, do not list it. Ask the user what they want to do with the coin.',
            body: {
                res
            }
        }
        
    } catch (error) {
        return {
            message: 'There is an error finding the details for the token '+ walletAddress,
        }
    }
}