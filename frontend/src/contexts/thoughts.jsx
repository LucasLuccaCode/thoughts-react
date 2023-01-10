import { createContext, useContext, useState } from "react"
import { api } from "../services/api"
import { useMessage } from "./message"

export const ThoughtsContext = createContext()


export function ThoughtsProvider({ children }) {
  const [thoughts, setThoughts] = useState([])
  const { setMessage } = useMessage()

  const updateThoughts = async (userId) => {
    try {
      const { data } = await api.get(`/users/${userId}`)

      setThoughts(data.user.thoughts)
    } catch ({ response }) {
      setMessage({ error: response.data.error })
    }
  }

  const value = { thoughts, setThoughts, updateThoughts }

  return (
    <ThoughtsContext.Provider value={value}>
      {children}
    </ThoughtsContext.Provider>
  )
}

export function useThoughts() {
  return useContext(ThoughtsContext)
}