import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/auth";

export function PrivateRoute() {
  const { authenticated } = useAuth()

  return authenticated ? <Outlet /> : <Navigate to={`/login`} />
}