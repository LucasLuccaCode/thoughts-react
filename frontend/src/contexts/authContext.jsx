import Cookies from "js-cookie";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { useMessage } from "./messageContext"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { setMessage } = useMessage()

  useEffect(() => {
    loadDataCache()
  }, [])

  const loadDataCache = useCallback(() => {
    const userCookie = Cookies.get("@thoughts:user", { expires: 7 }) // 7 dias
    const tokenCookie = Cookies.get("@thoughts:token", { expires: 7 }) // 7 dias

    if (userCookie && tokenCookie) {
      api.defaults.headers.common['auth-token'] = tokenCookie;

      setUser(JSON.parse(userCookie))
    }

    setIsLoading(false)
  }, [])

  const logout = useCallback(() => {
    Cookies.remove("@thoughts:user")
    Cookies.remove("@thoughts:token")
    
    setUser(null)
  }, [])

  const sigIn = useCallback(async ({ email, password }) => {
    try {
      const {data} = await api.post("/login", { email, password })
      
      api.defaults.headers.common['auth-token'] = data.token;

      Cookies.set("@thoughts:token", data.token)
      Cookies.set("@thoughts:user", JSON.stringify(data.user))

      setUser(data.user)
    } catch (error) {
      console.log(error)
      setMessage({ error: error.response.data.error || error.message })
    }
  }, [])

  const value = {
    user,
    sigIn,
    authenticated: !!user,
    logout,
    isLoading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}