import { createGoogleGenerativeAI } from "@ai-sdk/google";

const apiKey = process.env.GEMINI_KEY

const google = createGoogleGenerativeAI({
  apiKey: apiKey,
});

export const model = google('gemini-1.5-pro-latest')