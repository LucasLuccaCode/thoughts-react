import { useQuery } from "@tanstack/react-query"
import { createContext, useContext } from "react"
import Loader from "../components/Loader"
import { api } from "../services/api"
import { useAuth } from "./auth"
import { useMessage } from "./message"

export const ThoughtsContext = createContext()


export function ThoughtsProvider({ children }) {
  const { user } = useAuth()
  // const { setMessage } = useMessage()

  const { data, isLoading } = useQuery(['dashboard-thoughts'], () => api.get(`/users/${user?.id}`), {
    staleTime: Infinity
  })

  if (isLoading) {
    return <Loader />
  }
  
  const value = {
    thoughts: data?.data.user.thoughts || [],
    isLoading
  }

  return (
    <ThoughtsContext.Provider value={value}>
      {children}
    </ThoughtsContext.Provider>
  )
}

export function useThoughts() {
  return useContext(ThoughtsContext)
}