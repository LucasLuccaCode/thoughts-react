import { useQuery } from "@tanstack/react-query"
import { createContext, useContext } from "react"
import { api } from "../services/api"
import { useAuth } from "./authContext"
import { useMessage } from "./messageContext"

import Loader from "../components/Loader"

const DashboardContext = createContext()

export function DashboardProvider({ children }) {
  const { user } = useAuth()
  const { setMessage } = useMessage()

  const { data, isLoading, isLoadingError, error } = useQuery(['dashboard-thoughts'], () => api.get(`/users/${user?.id}`), {
    staleTime: Infinity,
    retry: 3,
    retryDelay: 2000 // 5 segundos
  })

  if (isLoading) {
    return <Loader />
  }

  if (isLoadingError) {
    return <p className="server-error">Erro ao consultar servidor</p>
  }
  
  if (error) {
    setMessage({ error: error.message || 'Erro desconhecido' })
    return
  }

  const value = {
    thoughts: data?.data.user.thoughts || []
  }

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboardThoughts() {
  return useContext(DashboardContext)
}