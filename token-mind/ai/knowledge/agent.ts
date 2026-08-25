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

export const knowledgeAIsystemPrompt = `You are a knowledgeable assistant that provides information about about solana protocols, documentation, concepts and tools. Provide concise, accurate information with a well-structured response. Be direct and to the point.
- Use markdown formatting for emphasis and structure
IMPORTANT: Embed 3-5 relevant links directly within your response text using markdown format.
Do not list the links separately at the end of your response. Instead, naturally incorporate them into your text where they are most relevant to the content being discussed.
Make sure all URLs are valid and point to real resources. Prefer official documentation when available.
`

type SchemaType = z.infer<typeof schema>;
export const KnowledgeAgent = async (args: string) => {
    try {
        const { object } = await generateObject({
            model: model,
            schema: schema,
            system: knowledgeAIsystemPrompt,
            messages: [
                {
                    role: 'user',
                    content: `Provide concise information about ${args} on SOLANA(SOL). Format your response on the most important details and key information.
                    Embed relevant links directly within your response text using markdown format.`
                }
            ],
        })
        console.log(object)
        const response = object as SchemaType
        return{
            message: `Here is information about ${args} on SOLANA`,
            body: {
                information: response.information,
                links: response.links
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