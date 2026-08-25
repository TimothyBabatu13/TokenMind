import { tool } from "ai";
import { z } from "zod";
import { getTrendingTokens } from "./agent/trending-token/agent";
import { getTokenInfo } from "./agent/get-token-info/agent";
import { KnowledgeAgent } from "./knowledge/agent";
import { getCachedDataOrFetch } from "@/lib/cache";
import { GET_TRENDING_DATA_KEY, GET_TRENDING_DATA_TTL } from "@/constants/constants";

export const getTrendingTokensAgent = tool({
    description: 'Fetches a list of currently trending tokens based on market activity, such as volume, price changes, and social mentions.',
    parameters: z.object({}),
    execute : async () =>{
        const body = await getCachedDataOrFetch({
            key: GET_TRENDING_DATA_KEY, 
            ttlSeconds: GET_TRENDING_DATA_TTL, 
            fetcher: async () => {
                const { body } = await getTrendingTokens();
                return body; 
            }})
            return {
                result: {
                    message: `Found ${body.prices.length} trending tokens. The user is shown the tokens, do not list them. Ask the user what they want to do with the coin.`,
                    body: {
                        tokens: body.tokens,
                        prices: body.prices,
                    }
    
                }
            }
    }
    
})

export const getKnowledgeAgent = tool({
    description: 'A knowledgeable assistant that provides information about Solana protocols, documentation, concepts and tools. Provide concise, accurate information with a well-structured response. Pass the user question as "info" (or "topic").',
    parameters: z.object({
        info: z.string().optional().describe('The user question or topic about Solana blockchain protocols, developer tools, documentation, or key concepts.'),
        topic: z.string().optional().describe('Alias for info. The user question or topic about Solana.'),
        query: z.string().optional().describe('Alias for info. The user question or topic about Solana.'),
    }),
    execute: async ({ info, topic, query }) => {
        const question = info?.trim() || topic?.trim() || query?.trim();
        if (!question) {
            return {
                res: {
                    message: "A Solana question is required.",
                    body: {
                        information: "Please ask a specific question about Solana.",
                        links: [],
                    },
                },
            };
        }
        const res = await KnowledgeAgent(question);
        return { res };
    }
})

export const getTokenInfoAgent = tool({
    description: 'Fetches the details for any solana token provided address is given',
    parameters: z.object({
        address: z.string().describe('This is the wallet address of the token details being fetched for. It always looks like this 61V8vBaqAGMpgDQi4JcAwo1dmBGHsyhzodcPqnEVpump')
    }),
    execute: async ({ address }) => {
        if(!address){
            return 'Please provide wallet address'
        }
        const res = await getTokenInfo({walletAddress: address})
        return{
            res
        }
    }
})


export const getTwitterTrendingAgents = tool({
    description: 'This gets the details for any solana token provided address is given',
    parameters: z.object({}),
    execute: async () => {
        return 'Tell the user this feature is coming'
    }
})

export const swapTokenAgent = tool({
    description: 'This is the tool to handle token swap. User can swap from one token to another.',
    parameters: z.object({
        from: z.string().describe('This is the token to be swapped to another token. If nothing is provided for this, use SOLANA(SOL) as the token'),
        to: z.string().describe('This is the end result token to be swapped into'),
        amount: z.string().describe('This is the unit of tokens to be swapped.')
    }),
    execute: async ({ from, to, amount }) => {
        console.log(from, to, amount)
        return 'Tell the user that this feature is coming'
    }
})


//agent to create memecoin and add liquidity to it.