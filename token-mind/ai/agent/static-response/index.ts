import { classifyDeterministicIntent } from "@/lib/intent-classifier";
import { getCachedTrendingTokens, trendingToolPayload } from "../trending-token/agent";

export const staticResponses = {
  greeting: "Hey, I am TokenMind. Ask me about a token, trending tokens, or Solana stuff.",
  thanks: "Anytime!",
  help: "I can help with: token info (paste a Solana address), trending tokens, Twitter crypto trends, token swaps, or general Solana/dev questions.",
  empty: "Didn't catch that — try asking about a token or what's trending.",
}

type Intent =
  | { name: "greeting" | "thanks" | "help"; type: "text"; getText: () => string }
  | { name: "trending_tokens"; type: "tool"; toolName: "GET_TRENDING_TOKEN"; getPayload: () => Promise<ReturnType<typeof trendingToolPayload>> };

export type DeterministicIntentName = Intent["name"];

const intents: Intent[] = [
  {
    name: "greeting",
    type: "text",
    getText: () => staticResponses.greeting,
  },
  {
    name: "thanks",
    type: "text",
    getText: () => staticResponses.thanks,
  },
  {
    name: "help",
    type: "text",
    getText: () => staticResponses.help,
  },
  {
    name: "trending_tokens",
    type: "tool",
    toolName: "GET_TRENDING_TOKEN",
    getPayload: async () => {
      const cached = await getCachedTrendingTokens();
      return trendingToolPayload(cached);
    },
  },
];

export const getDeterministicIntent = (name: string): Intent | null => {
  return intents.find((intent) => intent.name === name) ?? null;
}

export const matchDeterministicIntent = (input: string): Intent | null => {
  const label = classifyDeterministicIntent(input);
  if (!label) return null;
  return getDeterministicIntent(label);
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
