import { model } from '@/lib/model'
import { generateObject } from 'ai'
import { z } from 'zod'

const schema = z.object({
   information: z.string().describe('Detailed information about a query with embedded links in markdown format'),
   links: z.array(z.object({
    title: z.string().describe('Title of the resource'),
    url: z.string().url().describe('URL of the resource')
   })).describe('Relevant links that were embedded in the information text')

}) 
// FORMAT YOUR RESPONSE AS FOLLOWS:
// - Start with a short introductory paragraph (2-3 sentences) explaining the main concept
// - Use bullet points or numbered lists for features, components, or steps
// - Break information into short, digestible sections with clear headings when appropriate
// - Avoid long paragraphs of text -  keep text blocks short and focused
// Keep your responses brief and focus on the most important information. Aim for 3-4 short section maximum.
// Include technical details when relevant, but avoid unncessary verbosity.

export const knowledgeAIsystemPrompt = `You are a knowledgeable assistant that provides information about about solana protocols, documentation, concepts and tools. Provide concise, accurate information with a well-structured response. Be direct and to the point.
- Use markdown formatting for emphasis and structure
IMPORTANT: Embed 3-5 relevant links directly within your response text using markdown format.
Do not list the links separately at the end of your response. Instead, naturally incorporate them into your text where they are most relevant to the content being discussed.
Make sure all URLs are valid and point to real resources. Prefer official documentation when available.
`


export const KnowledgeAgent = async (args: string) => {
    try {
        const { object } = await generateObject({
            model: model,
            schema,
            system: knowledgeAIsystemPrompt,
            messages: [
                {
                    role: 'user',
                    content: `Provide concise information about ${args} on SOLANA(SOL). Format your response on the most important details and key information.
                    Embed relevant links directly within your response text using markdown format.`
                }
            ],
        })
        return{
            message: `Here is information about ${args} on SOLANA`,
            body: {
                information: object.information,
                links: object.links
            }
        }
    } catch (error) {
        console.log('')
        return{
            message: `Error retrieving inormation on ${args} on SOLANA`,
            body: {
                information: `Failed to get information about ${args} on SOLANA. Please try again later.`,
                links: [
                    {
                        title: 'SOLANA Chain Documentation',
                        url: ''
                    }
                ]
            }
        }
    }
}