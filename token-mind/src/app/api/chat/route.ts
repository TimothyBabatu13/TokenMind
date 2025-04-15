import { generateText } from "ai"
import { createGoogleGenerativeAI } from '@ai-sdk/google';

const google = createGoogleGenerativeAI({
  apiKey: '',
});

const { text } = await generateText({
model: google('gemini-1.5-pro-latest'),
prompt: "What is love?"
})
console.log(text)