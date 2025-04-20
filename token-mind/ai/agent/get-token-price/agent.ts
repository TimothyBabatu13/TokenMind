import type { FetchPriceResponse } from "../trending-token/type";

export const getTokenPrice = async (tokenId : string) : Promise<FetchPriceResponse> => {
    const apiEndpoint = `https://api.jup.ag/price/v2?ids=${tokenId}`;
    
    try {
        const api = await fetch(apiEndpoint);
    
        if(!api.ok){
            throw new Error('Failed to get token price');
        }
        const data = await api.json();

        if (!data.data || !data.data[tokenId]) {
        return {
            status: "error",
            message: "Token price not found",
            code: "TOKEN_NOT_FOUND"
        };
        }

        const price = data.data[tokenId].price;

        return {
        status: "success",
        tokenId,
        priceInUSDC: price
        };

    } catch (error) {
        return {
            status: "error",
            message: error instanceof Error ? error.message : "Unknown error occurred",
            code: "API_ERROR"
          };
    }
}