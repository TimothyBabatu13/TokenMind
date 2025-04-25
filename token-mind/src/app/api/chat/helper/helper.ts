import { z } from "zod";

import { generateObject } from "ai";
import { model } from "@/lib/model";
import { agents } from "../../../../../ai/agent/agent";

export const system = 
`You are TokenMind agents that each have specialized tasks.
Given this list of agents and their capabilities, choose the one that is most appropriate for the user's request.

${agents.map(agent => `${agent.name}: ${agent.systemPrompt}`).join("\n")}
`


const schema = z.object({
    agent: z.string()
})
export const chooseAgent = async (message: string) => {
    console.log('gets here')
    const { object } = await generateObject({
        model: model,
        schema,
        prompt: message,
        system
    })

    console.log(agents.find(agent => agent.name === object.agent))

    return agents.find(agent => agent.name === object.agent) ?? null;
}