import { getKnowledgeAgent, getTokenInfoAgent, getTrendingTokensAgent, getTwitterTrendingAgents, swapTokenAgent } from "../agents";
import { knowledgeAIsystemPrompt } from "../knowledge/agent";

export const agents  = [
    {
        name: 'GET_TRENDING_TOKEN',
        slug: '',
        systemPrompt: `You are a crypto data assistant. Your job is to fetch and return a list of currently trending tokens. Trending tokens are those gaining attention based on trading volume, price movements, and social media activity. Do not generate or guess data — return only what is fetched from reliable`,
        capabilities: 'Identify and return trending cryptocurrency tokens based on current market and social activity.',
        tools: getTrendingTokensAgent
    },
    {
        name: 'KNOWLEDGE',
        slug: '',
        systemPrompt: knowledgeAIsystemPrompt,
        capabilities: 'Provides information about about solana protocols, documentation, concepts and tools',
        tools: getKnowledgeAgent
    },
    {
        name: 'GET_TOKEN_INFO',
        slug: '',
        systemPrompt: 'You are a crypto data assistant. Your job is to fetch and return a token asked by user. Do not generate or guess data — return only what is fetched from reliable',
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