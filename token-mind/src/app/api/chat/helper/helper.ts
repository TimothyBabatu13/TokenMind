import { z } from "zod";
import { generateObject, generateText, type CoreMessage, Output } from "ai";
import { model } from "@/lib/model";
import { agents } from "../../../../../ai/agent/agent";

export const system = `
You are TokenMind — an intelligent controller that routes user questions to the correct AI agent. Each agent has a specialized function. Based on the user's input, select only one agent. Do not guess. Only pick an agent if the user prompt clearly matches its purpose.

Agent Definitions and Usage Rules:

1. GET_TOKEN_INFO
   - Use only when the user provides a Solana token mint address or contract address.
   - Example triggers:
     - "Tell me about this token 61V8vBaqAGM..."
     - "Get price for this CA"
     - "Token info for [address]"
   - ⚠️ Never use unless a valid Solana address is present in the prompt.

2. KNOWLEDGE
   - For explaining Solana protocols, developer tools, ecosystem projects, documentation, or general blockchain questions.
   - Also use for questions about a NAMED token or coin when no address is present (e.g. "tell me about trump coin", "what's BONK").
   - Example triggers:
     - "How does staking work on Solana?"
     - "What's the Anchor framework?"
     - "Tell me about Metaplex"
     - "Tell me more about trump coin"
   - ⚠️ Never use for token stats or prices when a valid address is present — use GET_TOKEN_INFO instead.

3. GET_TRENDING_TOKEN
   - Use when the user wants to know about popular or trending tokens right now.
   - Example triggers:
     - "What tokens are trending?"
     - "Show me top tokens on Solana"
   - ⚠️ Only use when user mentions "trending", "popular", or "top tokens".

4. GET_TWITTER_TRENDING_TOPICS
   - Use when the user wants to see what's trending on Twitter related to crypto or Solana.
   - Example triggers:
     - "What's trending on Twitter?"
     - "Solana Twitter trends"

5. SWAP_TOKEN
   - Use when the user wants to convert one token into another.
   - Example triggers:
     - "Swap SOL to USDC"
     - "I want to convert TRUMP to BONK"
     - "Exchange tokens"

🛑 RULES:
- Never guess. If the input doesn't clearly match any agent, return "NONE".
- Do not combine multiple agents.
- Use exact agent names from the list below. If nothing matches, return "NONE".

${agents.map(agent => `- ${agent.name}`).join('\n')}
`;


const agentNames = agents.map(agent => agent.name);
const schema = z.object({
  agent: z.enum(["NONE", ...agentNames] as [string, ...string[]]),
});
type SchemaType = z.infer<typeof schema>;

export const chooseAgent = async (history: CoreMessage[]) => {
  try {
    const { experimental_output } = await generateText({
      model,
      experimental_output: Output.object({schema: schema}),      
      system,
      messages: history,
      temperature: 0,
      maxTokens: 4096,
    });

    const object= experimental_output as SchemaType;

    if (object.agent === "NONE") {
      return null;
    }

    const matched = agents.find(agent => agent.name === object.agent);

    if (!matched) {
      console.error(`[chooseAgent] model returned unknown agent name: ${object.agent}`);
      return null;
    }

    return matched;
  } catch (error) {
    console.error("[chooseAgent] routing failed:", error);
    return null;
  }
};