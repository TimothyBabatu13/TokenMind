import { streamText } from "ai"
import { NextRequest } from "next/server";
import { chooseAgent } from "./helper/helper";
import { model } from "@/lib/model";
import { agents } from "../../../../ai/agent/agent";

const systemPromot = `You are TokenMind agents that each have specialized tasks.
Given this list of agents and their capabilities, choose the one that is most appropriate for the user's request.
${agents.map(agent => `${agent.name}: ${agent.systemPrompt}`).join("\n")}
  If any of these does not fall into user's prompt, do well to answer the user without. Anything that falls outside of this, do not reply to it. Kindly reply the user that it is not part of what you are built for. Always make your response concise and avoid buzz words.
  Unless explicitly stated, you should not reiterate the output of the tool as it is shown in the user interface
`
type MessageProps = Array<{
    role: 'user',
    content: string,
    parts: Array<object>
}>


const getLastMessage = ( arr  : MessageProps ) : string  => {
  const lastIndex = arr.length - 1;
  const message = arr[lastIndex].content;
  return message;
}

const getLastTenMessages = (arr: MessageProps ) : MessageProps => {
  const message = arr.slice(-10);
  return message;
}

export const POST = async (req: NextRequest) => {

  const { messages } = await req.json();
  
  const usersWalletAddress = req.nextUrl.searchParams.get('walletAddress')

  const message = getLastMessage(messages);
  const conversationHistory = getLastTenMessages(messages)
  const systemPrompt = `${systemPromot}. This current user wallet address is ${usersWalletAddress}`

  const agent = await chooseAgent(message);

console.log(agent)
  if(!agent) {

    const result = streamText({
      model,
      messages: conversationHistory,
      system: systemPrompt,
    })
    result.toDataStream()
    return result.toDataStreamResponse();
  }
  else {
    const agentName = agent.name
    console.log(agentName)
    const result = streamText({
      model: model,
      toolChoice: "auto",
      system: systemPrompt,
      tools: {
        [agentName]: agent.tools,
      },
      messages: conversationHistory,
      maxSteps: 10,
      maxRetries: 0
      })
  
      result.toDataStream()
      return result.toDataStreamResponse();
  }
}
