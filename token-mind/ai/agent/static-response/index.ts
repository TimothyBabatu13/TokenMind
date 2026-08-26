import { getCachedTrendingTokens, trendingToolPayload } from "../trending-token/agent";

export const staticResponses = {
  greeting: "Hey, I am TokenMind. Ask me about a token, trending tokens, or Solana stuff.",
  thanks: "Anytime!",
  help: "I can help with: token info (paste a Solana address), trending tokens, Twitter crypto trends, token swaps, or general Solana/dev questions.",
  empty: "Didn't catch that — try asking about a token or what's trending.",
}

type Intent =
  | { name: "greeting" | "thanks" | "help"; type: "text"; match: (input: string) => boolean; getText: () => string }
  | { name: "trending_tokens"; type: "tool"; match: (input: string) => boolean; toolName: "GET_TRENDING_TOKEN"; getPayload: () => Promise<ReturnType<typeof trendingToolPayload>>; };

export type DeterministicIntentName = Intent["name"];

  const normalize = (input: string) => input.trim().toLowerCase().replace(/[!?.]+$/, "");

const intents: Intent[] = [
  {
    name: "greeting",
    type: "text",
    match: (input) => /^(hi|hii|hello|hey|yo|sup)!?$/i.test(input.trim()),
    getText: () => staticResponses.greeting,
  },
  {
    name: "thanks",
    type: "text",
    match: (input) => /^(thanks|thank you|thx|ok|cool|nice)!?$/i.test(input.trim()),
    getText: () => staticResponses.thanks,
  },
  {
    name: "help",
    type: "text",
    match: (input) => /^(help|what can you do|what do you do)\??$/i.test(input.trim()),
    getText: () => staticResponses.help,
  },
  {
    name: "trending_tokens",
    type: "tool",
    match: (input) => {
      const n = normalize(input);
      const mentionsTrend = /\btrend(ing)?\b|\btop\b|\bpopular\b|\bhot\b/.test(n);
      const mentionsMarket = /\btokens?\b|\bcoins?\b|\bsolana\b/.test(n);
      const wantsExplanation = /\bwhy\b|\bhow come\b|\bexplain\b|\bwhat caused\b|\breason\b/.test(n);
      return mentionsTrend && mentionsMarket && !wantsExplanation;
    },
    toolName: "GET_TRENDING_TOKEN",
    getPayload: async () => {
      const cached = await getCachedTrendingTokens();
      return trendingToolPayload(cached);
    },
  },
];

export const matchDeterministicIntent = (input: string): Intent | null => {
  const trimmed = input.trim();
  if (!trimmed) return null;
  return intents.find((intent) => intent.match(trimmed)) ?? null;
}

export const getDeterministicIntent = (name: string): Intent | null => {
  return intents.find((intent) => intent.name === name) ?? null;
}

export const resolveDeterministicIntent = (
  input: string,
  intentName?: string | null
): Intent | null => {
  if (intentName) {
    const named = getDeterministicIntent(intentName);
    if (named) return named;
  }
  return matchDeterministicIntent(input);
}