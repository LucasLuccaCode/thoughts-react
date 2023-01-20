import { createContext, useContext, useState } from "react";

export const MessageContext = createContext()

export function MessageProvider({ children }) {
  const [message, setMessage] = useState(null)

  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  )
}

export function useMessage(){
  return useContext(MessageContext)
}