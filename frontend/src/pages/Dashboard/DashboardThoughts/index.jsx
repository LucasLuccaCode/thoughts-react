import { useState } from "react"
import { Link } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import "./styles.css"

import { useThoughts } from "../../../contexts/thoughts"
import { useMessage } from "../../../contexts/message"
import { api } from "../../../services/api"

import Loader from "../../../components/Loader"

export default function DashboardThoughts() {
  const [currentPage, setCurrentPage] = useState(10)
  const { thoughts } = useThoughts()
  const { setMessage } = useMessage()

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(
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
                  <li key={thought.id}>
                    <h3>&#8220; {thought.content} &#8220;</h3>
                    <div className="c-dashboard__thoughts__actions">
                      <Link className="btn" to={`${thought.id}/edit`}>Editar</Link>

                      <button className="btn" onClick={() => mutate(thought.id)}>
                        Deletar
                      </button>
                    </div>
                  </li>
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
        !thoughts.length && !isLoading && (
          <p className="empty">Nenhum pensamento publicado, <Link to={`add`}>clique aqui</Link> para adicionar um.</p>
        )
      }
      {
        !thoughts.length && isLoading && (
          <Loader />
        )
      }
    </div >
  )
}