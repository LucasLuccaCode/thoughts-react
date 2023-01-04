import { createContext, useState } from "react";

export const MessageContext = createContext(null)

export default function MessageProvider({ children }) {
  const [message, setMessage] = useState({ success: "Tudo certo com o contexto das mensagens"})

  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  )
}