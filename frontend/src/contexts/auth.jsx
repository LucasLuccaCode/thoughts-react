import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userStorage = localStorage.getItem("@auth:user")
    const tokenStorage = localStorage.getItem("@auth:token")
    if (userStorage && tokenStorage) {
      setUser(JSON.parse(userStorage))
    }
  }, [])

  const logout = () => {
    setUser(null)
    localStorage.removeItem("@auth:user")
    localStorage.removeItem("@auth:token")
  }

  const authenticate = ({ user, token }) => {
    api.defaults.headers.common['Authorization'] = token;

    setUser(user)

    localStorage.setItem("@auth:token", token)
    localStorage.setItem("@auth:user", JSON.stringify(user))
  }

  const value = {
    user,
    authenticate,
    authenticated: !!user,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}