'use client';

import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface chatContextProp {
    text: string,
    setText: Dispatch<SetStateAction<string>>
}
const chatContext = createContext<null | chatContextProp>(null);

const ChatContext = ( { children } : {
    children: React.ReactNode
}) => {

    const [text, setText] = useState<string>('');


  return (
    <chatContext.Provider value={{text, setText}}>
        {children}
    </chatContext.Provider>
  )
}

export default ChatContext

export const useChatProvider = () => {
    const context = useContext(chatContext);
    if(!context) return;
    return context;
}