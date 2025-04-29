import { tool } from "ai";
import { z } from "zod";
import { getTrendingTokens } from "./agent/trending-token/agent";
import { getTokenInfo } from "./agent/get-token-info/agent";
import { KnowledgeAgent } from "./knowledge/agent";

export const getTrendingTokensAgent = tool({
    description: 'Fetches a list of currently trending tokens based on market activity, such as volume, price changes, and social mentions.',
    parameters: z.object({}),
    execute : async () =>{
        const result = await getTrendingTokens();
        return {
            result
        }
    }
    
})

export const getKnowledgeAgent = tool({
    description: 'A knowledgeable assistant that provides information about about solana protocols, documentation, concepts and tools. Provide concise, accurate information with a well-structured response',
    parameters: z.object({
        info: z.string().describe('A short sentence or question asking for specific information about Solana blockchain protocols, developer tools, documentation, or key concepts.')
    }),
    execute: async ({ info }) => {
        const res = await KnowledgeAgent(info)
        return {res, invo: 'knowledge'};
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
        console.log(res)
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