import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

export function PrivateRoute() {
  const { authenticated } = useContext(AuthContext)

  return authenticated ? <Outlet /> : <Navigate to={`/login`} />
}