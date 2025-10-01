// import Logo from "@/components/Logo"
import { LoadingMessage } from "./thinking-components";
import { ChatRequestOptions, UIMessage } from "ai";
import { GetTrendingTokenUI } from "../invocation-ui/get-trending-token";
import { ThinkingCard } from "./thinking-card";
import TokenCard from "../invocation-ui/get-token-info";
import KnowledgeMarkdown from "../invocation-ui/knowledge-markdown";
import { Button } from "@/components/ui/button";

type ViewMessageType = {
  messages: UIMessage[];
  error: Error | undefined,
  reload: (chatRequestOptions?: ChatRequestOptions | undefined) => Promise<string | null | undefined>,
  isLoading: boolean
};
export const ViewMessage = ({ messages, error, reload, isLoading } : ViewMessageType) => {

  console.log(error)
    // console.log(messages)
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
                            key={crypto.randomUUID()}
                            className={`flex ${message.role === "user" ? "justify-end mb-2" : "justify-start mb-2"}`}
                          >
                          <div
                            className={`max-w-[80%] rounded-2xl p-4 flex ${
                            message.role === "user" ? "bg-purple-600 rounded-tr-none" : "bg-gray-800 rounded-tl-none"
                          }`}
                        >
                          <KnowledgeMarkdown msg={part.text} />
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

                        case 'GET_TOKEN_INFO' : {
                          switch (part.toolInvocation.state) {
                            case 'call': {
                              return (
                                <div key={callId}>
                                  {part.toolInvocation.args.message}
                                  <div>
                                    <ThinkingCard text="Token Info Ai Agent thinking"/>                                    
                                  </div>
                                </div>)
                            }

                            case 'result' : {
                              return (
                                <div 
                                  key={callId}
                                >
                                  <TokenCard 
                                    data={part.toolInvocation.result['res']['body']['res']}
                                  />
                                </div>
                              )
                            }
                          }
                          break;
                          
                        }
        
                      }
                    
                   }
                  })}
                </div>
              ))}
              
              { 
              isLoading && 
              (<div>
                <div
                  key={crypto.randomUUID()}
                  className={`flex justify-start mb-2`}
                >
                  <ThinkingView />
                </div>
              </div>
              )
              }

              {
              error && 
              (<div>
                <div
                  key={crypto.randomUUID()}
                  className={`flex justify-start mb-2`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 flex flex-col bg-gray-800 rounded-tl-none`}
                  >
                    <ErrorMessageFormat errorMessage={error.message}/>
                    <Button 
                      className="w-fit mt-2 cursor-pointer"
                      onClick={
                        ()=>{
                          reload()
                        }
                      }
                    >
                      Refresh
                    </Button>
                  </div>
                </div>
              </div>
              )
        }
      </div>
    )
}

export const ThinkingView = () => {
    return(
        <LoadingMessage />
    )
}

const ErrorMessageFormat = ({ errorMessage } : {
  errorMessage: string
}) => {
  console.log(errorMessage)
  let msg: string;
  switch (errorMessage) {
    case `"Failed after 3 attempts. Last error: Cannot connect to API: getaddrinfo ENOTFOUND generativelanguage.googleapis.com"`:
      msg =  "Internet Connectivity error. Check your internet"
      break;
    case '"Failed after 3 attempts. Last error: Cannot connect to API: Connect Timeout Error (attempted addresses: 216.58.214.170:443, 142.250.74.234:443, 216.58.213.74:443, 172.217.20.202:443, 172.217.18.202:443, 142.250.178.138:443, 142.250.75.234:443, 216.58.214.74:443, 216.58.215.42:443, 142.250.179.106:443, 142.250.201.170:443, 142.250.179.74:443, 172.217.20.170:443, timeout: 10000ms)"':
      msg= "There is an error with the api"
      break;
    default:
      msg = "Nothing is here"
      break;
  }

  console.log(msg)
  return (<div>
    {msg}
  </div>)
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