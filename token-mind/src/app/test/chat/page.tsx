'use client';

import { GetTrendingTokenUI } from '@/app/chat/invocation-ui/get-trending-token';
import { useChat } from '@ai-sdk/react';

export default function Page() {
  const { messages, input, handleSubmit, handleInputChange,  } =
    useChat();

    console.log(messages)
  return (
    <div>
      {messages.map(message => (
        <div key={message.id}>
          <strong>{`${message.role}: `}</strong>
          
          {message.parts.map((part) => {
           switch (part.type) {
            case 'text':{
              return part.text
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
                            <button
                              // onClick={() =>
                              //   addToolResulT({
                              //     toolCallId: callId,
                              //     result: 'Yes, confirmed.',
                              //   })
                              // }
                            >
                              Yes
                            </button>
                            <button
                              // onClick={() =>
                              //   addToolResult({
                              //     toolCallId: callId,
                              //     result: 'No, denied',
                              //   })
                              // }
                            >
                              No
                            </button>
                          </div>
                        </div>)
                        
                    }

                    case 'result':
                          return (
                            <div key={callId}>
                              <GetTrendingTokenUI
                                data={part.toolInvocation.result['result']['body']['tokens']}
                              />
                              {/* {JSON.stringify(part.toolInvocation.result['result']['body']['tokens'])} */}
                            </div>
                          );
                
                  }
                  break
                }

              }
           }
          })}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          placeholder="Send a message..."
          onChange={handleInputChange}
        //   disabled={status !== 'ready'}
        />
      </form>
    </div>
  );
}
