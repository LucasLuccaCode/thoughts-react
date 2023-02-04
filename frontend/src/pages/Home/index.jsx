import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import "./styles.css"

import HomeTitle from "./HomeTItle";
import Thoughts from "../../components/Thoughts";
import Loader from "../../components/Loader";

export default function Home() {

  const {
    data,
    isLoading,
    isLoadingError,
    error
  } = useQuery(['home-thoughts'], () => api.get('/thoughts'), {
    staleTime: Infinity,
    retry: 3,
    retryDelay: 2000
  })

  const thoughts = data?.data.thoughts

  if (isLoading) {
    return <Loader />
  }

  if (isLoadingError) {
    return <p className="server-error">Erro ao consultar servidor</p>
  }

  if (error) {
    // setMessage({ error: error.message || 'Erro desconhecido' })
    console.log(error)
    return
  }

  return (
    <div className="c-home__thoughts">
      <HomeTitle search={''} />
      <Thoughts thoughts={thoughts} />

      <Outlet />
    </div>
  )
}