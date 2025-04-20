import { tool } from "ai";
import { z } from "zod";
import { getTrendingTokens } from "./agent/trending-token/agent";

export const getTrendingTokensAgent = tool({
    description: '',
    parameters: z.object({}),
    execute : async () =>{
        const result = await getTrendingTokens();
        return {
            result
        }
    }
    
})

export const getTokenInfoAgent = tool({
    description: 'This gets the details for any solana token provided address is given',
    parameters: z.object({
        address: z.string().describe('This is the wallet address of the token details being looking for')
    }),
    execute: async ({ address }) => {
        return address + 'Tell the user this feature is coming'
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
