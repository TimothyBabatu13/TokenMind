import { createOpenAI } from "@ai-sdk/openai";

const openrouter = createOpenAI({
  apiKey: process.env.OPEN_ROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1'
});


export const model = openrouter('nvidia/nemotron-3.5-lightning:free')