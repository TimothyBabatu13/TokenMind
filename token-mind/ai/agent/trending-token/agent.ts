import { getTokenPrice } from "../get-token-price/agent";
import { JupiterTokenData } from "./type";

export const getTrendingTokens = async () => {
    const apiEndpoint = 'https://tokens.jup.ag/tokens?tags=birdeye-trending';
    try {
        const api = await fetch(apiEndpoint);
        if(!api.ok){
            throw new Error('Failed to fetch trending tokens');
        }
        let tokens: JupiterTokenData[] = await api.json();

        tokens = tokens.slice(0, 10);

        const prices = await Promise.all(tokens.map(async (token) => {
            const price = await getTokenPrice(token.address);
            return Number(price.priceInUSDC ?? "0");
        }));
    
        return {
            message: `Found ${tokens.length} trending tokens. The user is shown the tokens, do not list them. Ask the user what they want to do with the coin.`,
            body: {
            tokens,
            prices
            }
        };
    } catch (error) {
        return {
            message: `Error getting trending tokens: ${error}`,
            body: {
              tokens: [],
              prices: []
            }
          };
    }
}