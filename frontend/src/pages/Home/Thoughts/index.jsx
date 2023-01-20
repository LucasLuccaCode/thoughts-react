import { useCallback, useState } from "react"
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../services/api";
import "./styles.css"

import Thought from "./Thought"
import Loader from "../../../components/Loader";

export default function Thoughts() {
  const [currentPage, setCurrentPage] = useState(10)

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

  const nextPage = useCallback(() => {
    const perPage = 10
    const nextPage = currentPage + perPage
    const newCurrentPage = Math.min(nextPage, thoughts.length)
    setCurrentPage(newCurrentPage)
  }, [thoughts])

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

  return (
    <div className="c-home__thoughts">
      {
        thoughts?.length ? (
          <>
            <ul className="c-home__thoughts__posts max-width">
              {
                thoughts?.slice(0, currentPage).map(thought => (
                  <Thought thought={thought} key={thought.id} />
                ))
              }
            </ul>
            {
              currentPage < thoughts.length && (
                <button className="btn more-thoughts" onClick={nextPage}>Mostrar mais</button>
              )
            }
          </>
        ) : (
          <p className="empty">Nenhum pensamento publicado ainda...</p>
        )
      }
    </div>
  )
}