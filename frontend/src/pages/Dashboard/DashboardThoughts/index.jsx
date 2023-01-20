import { useState } from "react"
import { Link } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import "./styles.css"

import { useDashboardThoughts } from "../../../contexts/dashboardContext"
import { useMessage } from "../../../contexts/messageContext"
import { api } from "../../../services/api"
import ThoughtCard from "./ThoughtCard"

export default function DashboardThoughts() {
  const [currentPage, setCurrentPage] = useState(10)
  const { thoughts } = useDashboardThoughts()
  const { setMessage } = useMessage()

  const queryClient = useQueryClient()

  const { mutate } = useMutation(
    (thoughtId) => api.delete(`/thoughts/${thoughtId}`),
    {
      onSuccess: (data, variables, context) => {
        setMessage({ success: data.data.message })
        queryClient.invalidateQueries('dashboard-thoughts')
      },
      onError: (error) => {
        console.log(error)
        setMessage({ error: error.message })
      }
    }
  )

  const nextPage = () => {
    const perPage = 10
    const nextPage = currentPage + perPage
    const newCurrentPage = Math.min(nextPage, thoughts.length)
    setCurrentPage(newCurrentPage)
  }

  return (
    <div className="c-dashboard__thoughts">
      <h2>Seus pensamentos: <span>{thoughts.length}</span></h2>

      {
        !!thoughts.length && (
          <>
            <ul className="c-dashboard__thoughts">
              {
                thoughts?.slice(0, currentPage).map(thought => (
                  <ThoughtCard thought={thought} deleteThought={() => mutate(thought.id)} key={thought.id} />
                ))

              }
            </ul>
            {
              currentPage < thoughts.length && (
                <button className="btn more-thoughts" onClick={nextPage}>Mostrar mais</button>
              )
            }
          </>
        )
      }
      {
        !thoughts.length && (
          <p className="empty">Nenhum pensamento publicado, <Link to={`add`}>clique aqui</Link> para adicionar um.</p>
        )
      }
    </div >
  )
}