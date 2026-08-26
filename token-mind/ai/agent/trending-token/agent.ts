import { BIRD_EYE_API_KEY } from "@/constants/api_keys";
import { JupiterTokenData } from "./type";
import { getCachedDataOrFetch } from "@/lib/cache";
import { GET_TRENDING_DATA_KEY, GET_TRENDING_DATA_TTL } from "@/constants/constants";
import { birdeyeEvidence, type Evidence } from "@/lib/evidence";

const options = {
  method: 'GET',
  headers: {'x-chain': 'solana', accept: 'application/json', 'X-API-KEY': BIRD_EYE_API_KEY}
};

interface TokenReturnType {
    address: string,
    decimals: number,
    fdv: number,
    liquidity: number,
    logoURI: string,
    marketcap: number,
    name: string,
    price: number,
    rank: number,
    symbol: string,
    volume24hUSD: number,
    volume24hChangePercent: number,
    price24hChangePercent: number,
    isScaledUiToken: boolean,
    multiplier: null | any
}

interface BirdEyeApiEndpointReturnTYpe {
    data: {
        updateUnixTime: number,
        updateTime: string,
        tokens: Array<TokenReturnType>,
    },
    success: boolean
}

export const getTrendingTokens = async () => {
    const apiEndpoint = 'https://public-api.birdeye.so/defi/token_trending?sort_by=rank&interval=24h&sort_type=asc&offset=0&limit=50&ui_amount_mode=scaled';

    try {
        const api = await fetch(apiEndpoint, options);
        if(!api.ok){
            throw new Error('Failed to fetch trending tokens');
        }
        const response = await api.json() as BirdEyeApiEndpointReturnTYpe;
        if(!response.success) {
            return ({
            message: `Error getting trending tokens`,
            body: {
              tokens: [],
              prices: []
            }
          })
        }
        let tokensRaw = response.data.tokens;

        let tokens: JupiterTokenData[] = tokensRaw.map((token) => ({
            address: token.address,
            name: token.name,
            symbol: token.symbol?.trim(),
            decimals: token.decimals,
            tags: ["birdeye-trending"],
            logoURI: token.logoURI,
            daily_volume: token.volume24hUSD,
            freeze_authority: null,
            mint_authority: null,
            permanent_delegate: null,
            extensions: {
                coingeckoId: undefined
            }
        }));

        tokens = tokens.slice(0, 10);
        const prices = tokensRaw.slice(0, 10).map((t) => t.price);
    
        return {
            message: `Found ${tokens.length} trending tokens. The user is shown the tokens, do not list them. Ask the user what they want to do with the coin.`,
            ...birdeyeEvidence(),
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

export type CachedTrendingTokens = Evidence & {
  tokens: JupiterTokenData[];
  prices: number[];
};

export const getCachedTrendingTokens = async (): Promise<CachedTrendingTokens> => {
  return getCachedDataOrFetch({
    key: GET_TRENDING_DATA_KEY,
    ttlSeconds: GET_TRENDING_DATA_TTL,
    fetcher: async () => {
      const result = await getTrendingTokens();
      return {
        tokens: result.body.tokens,
        prices: result.body.prices,
        source: "source" in result && result.source ? result.source : "Birdeye",
        fetchedAt: "fetchedAt" in result && result.fetchedAt
          ? result.fetchedAt
          : new Date().toISOString(),
      };
    },
  });
}

export const trendingToolPayload = (cached: CachedTrendingTokens) => {
  return {
    result: {
      message: `Found ${cached.prices.length} trending tokens. The user is shown the tokens, do not list them. Ask the user what they want to do with the coin.`,
      source: cached.source,
      fetchedAt: cached.fetchedAt,
      body: {
        tokens: cached.tokens,
        prices: cached.prices,
      },
    },
  };
}