import { api } from "../../services/api";
import "./styles.css"

import Thoughts from "../../components/Thoughts";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";

export default function Favorites() {
  const { data, isLoading } = useQuery(['favorites'], 
    () => api.get('/users/favorites'),
    {
      staleTime: Infinity,
      retry: false
    }
  )

  const favorites = data?.data.favorites

  if(isLoading){
    return <Loader />
  }

  return (
    <div className="c-favorites">
      <h1>Favoritos</h1>

      <Thoughts thoughts={favorites} />
    </div>
  )
}