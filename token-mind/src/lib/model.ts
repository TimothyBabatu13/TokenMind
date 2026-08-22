import { createGoogleGenerativeAI } from "@ai-sdk/google";

import { createOpenAI } from "@ai-sdk/openai";

const apiKey = process.env.GEMINI_KEY

const openrouter = createOpenAI({
  apiKey: process.env.OPEN_ROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1'
});

// const openrouter = createOpenAI({
//   apiKey: process.env.OPENROUTER_API_KEY,
//   baseURL: "https://openrouter.ai/api/v1",
// });
export const model = openrouter('nvidia/nemotron-3.5-lightning:free')

// export const getLasagnaRecipe = async (modelName: string) => {
//   const openrouter = createOpenRouter({
//     apiKey: '<OPENROUTER_API_KEY>',
//   });
//   return openrouter
// }

// getLasagnaRecipe('qwen/qwen3.6-27b')
// const openrouter = createOpenRouter({
//   apiKey: process.env.OPENROUTER_API_KEY,
// });


// export const model = openrouter('qwen/qwen3.6-27b');