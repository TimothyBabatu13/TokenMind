// import Logo from "@/components/Logo"
import { LoadingMessage } from "./thinking-components";
import { UIMessage } from "ai";
import { GetTrendingTokenUI } from "../invocation-ui/get-trending-token";
import { ThinkingCard } from "./thinking-card";
import KnowledgeMarkdown from "../invocation-ui/knowledge-markdown";

type ViewMessageType = {
  messages: UIMessage[];
};
export const ViewMessage = ({ messages } : ViewMessageType) => {
    console.log(messages)
    return(
      <div>
        {messages.map(message => (
                <div 
                  key={message.id}
                  // className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.parts.map((part) => {
                    switch (part.type) {
                      case 'text': {
                        return(
                          <div
                            className={`flex ${message.role === "user" ? "justify-end mb-2" : "justify-start mb-2"}`}
                          >
                          <div
                            className={`max-w-[80%] rounded-2xl p-4 flex ${
                            message.role === "user" ? "bg-purple-600 rounded-tr-none" : "bg-gray-800 rounded-tl-none"
                          }`}
                        >
                          {part.text}
                        </div>
                          </div>
                      )
                    }
                    case 'tool-invocation':
                      const callId = part.toolInvocation.toolCallId;
                      switch (part.toolInvocation.toolName){
                        case 'GET_TRENDING_TOKEN': {
                          switch (part.toolInvocation.state) {
                            
                            case 'call': {
                              return (
                                <div key={callId}>
                                  {part.toolInvocation.args.message}
                                  <div>
                                    <ThinkingCard text="Trending Token Ai Agent thinking"/>                                    
                                  </div>
                                </div>)
                                
                            }
        
                            case 'result':
                                  return (
                                    <div key={callId}>
                                      <GetTrendingTokenUI
                                        data={part.toolInvocation.result['result']['body']['tokens']}
                                        prices={part.toolInvocation.result['result']['body']['prices']}
                                      />
                                      
                                      {/* {JSON.stringify(part.toolInvocation.result['result']['body']['tokens'])} */}
                                    </div>
                                  );
                        
                          }
                          break
                        }

                        case 'KNOWLEDGE' : {
                          return (
                            <div>
                              <KnowledgeMarkdown msg={`
I couldn't find a token specifically named "Trump" on Solana. It's possible this token exists on a different blockchain or isn't widely recognized.

You can explore popular Solana token lists on sites like [CoinGecko](https://www.coingecko.com/en/coins/solana) or [Raydium](https://raydium.io/swap/).

For more general information about Solana tokens, the [Solana Cookbook](https://solanacookbook.com/references/token-program.html) offers a good starting point.

If you're looking for newly launched or trending tokens, check [Discord](https://discord.com/) or [Telegram](https://telegram.org/).
`}/>
                            </div>
                          )
                        }
        
                      }
                    
                   }
                  })}
                </div>
              ))}
          
      </div>
    )
}

export const ThinkingView = () => {
    return(
        <LoadingMessage />
    )
}



// {messages.map((message, index) => (
//   <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
//     <div
//       className={`max-w-[80%] rounded-2xl p-4 ${
//         message.role === "user" ? "bg-purple-600 rounded-tr-none" : "bg-gray-800 rounded-tl-none"
//       }`}
//     >
//       {message.role === "assistant" && (
//         <div className="flex items-center mb-2">
//           <div className="h-6 w-6 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center mr-2">
//             <Logo />
//           </div>
//           <span className="text-sm font-medium">TokenAI</span>
//         </div>
//       )}
//       <p className="whitespace-pre-line">{message.content}</p>
//     </div>
//   </div>
// ))}