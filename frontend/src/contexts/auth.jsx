import { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { api } from "../services/api";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  // const navigate = useNavigate()

  useEffect(() => {
    const loadDataStorage = () => {
      const userStorage = localStorage.getItem("@auth:user")
      const tokenStorage = localStorage.getItem("@auth:token")
      if (userStorage && tokenStorage) {
        setUser(JSON.parse(userStorage))
        api.defaults.headers.common['auth-token'] = tokenStorage;
      }
    }
    loadDataStorage()
  }, [])

  const logout = () => {
    setUser(null)
    localStorage.removeItem("@auth:user")
    localStorage.removeItem("@auth:token")
    return <Navigate to={`/login`} />
  }

  const authenticate = ({ user, token }) => {
    api.defaults.headers.common['auth-token'] = token;

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

export function useAuth() {
  return useContext(AuthContext)
}