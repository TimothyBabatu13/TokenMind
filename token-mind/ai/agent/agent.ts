import { getTokenInfoAgent, getTrendingTokensAgent, getTwitterTrendingAgents, swapTokenAgent } from "../agents";

export const agents  = [
    {
        name: 'GET_TRENDING_TOKEN',
        slug: '',
        systemPrompt: '',
        capabilities: '',
        tools: getTrendingTokensAgent
    },
    {
        name: 'GET_TOKEN_INFO',
        slug: '',
        systemPrompt: '',
        capabilities: '',
        tools: getTokenInfoAgent
    },
    {
        name: 'GET_TWITTER_TRENDING_TOPICS',
        slug: '',
        systemPrompt: '',
        capabilities: '',
        tools: getTwitterTrendingAgents
    },
    {
        name: 'SWAP_TOKEN',
        slug: '',
        systemPrompt: '',
        capabilities: '',
        tools: swapTokenAgent
    }
]