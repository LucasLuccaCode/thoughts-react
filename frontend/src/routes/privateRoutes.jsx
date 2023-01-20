import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/Loader";
import { useAuth } from "../contexts/authContext";

export function PrivateRoute() {
  const { authenticated, isLoading } = useAuth()

  if(isLoading){
    return <Loader />
  }

  return authenticated ? <Outlet /> : <Navigate to={`/login`} />
}