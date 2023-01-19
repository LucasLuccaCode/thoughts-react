import { useEffect, useState } from "react"
import { Form, Link } from "react-router-dom"
import { useAuth } from "../../../contexts/auth"
import { useMessage } from "../../../contexts/message"
import { useThoughts } from "../../../contexts/thoughts"
import { api } from "../../../services/api"
import Loader from "../../../components/Loader"
import "./styles.css"


export default function DashboardThoughts() {
  const { thoughts, updateThoughtsByUserId } = useThoughts()
  const [activeLoader, setActiveLoader] = useState(true)
  const { user } = useAuth()
  const { setMessage } = useMessage()
  const [currentPage, setCurrentPage] = useState(10)

  useEffect(() => {
    updateThoughtsByUserId(user.id)
      .finally(() => {
        setActiveLoader(false)
      })
  }, [])

  const nextPage = () => {
    const perPage = 10
    const nextPage = currentPage + perPage
    const newCurrentPage = Math.min(nextPage, thoughts.length)
    setCurrentPage(newCurrentPage)
  }
  
  const handleDeleteThought = async (e) => {
    e.preventDefault()
    setMessage()

    try {
      const formData = new FormData(e.target);
      const { thoughtId } = Object.fromEntries(formData);

      const { data } = await api.delete(`/thoughts/${thoughtId}`)

      await updateThoughtsByUserId(user.id)
      setMessage({ success: data.message })
    } catch ({ response }) {
      setMessage({ error: response.data.error })
    }
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
                      <Form onSubmit={handleDeleteThought} method="DELETE">
                        <input type="hidden" name="thoughtId" value={thought.id} />
                        <input className="btn" type="submit" value="Deletar" />
                      </Form>
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
        !thoughts.length && !activeLoader && (
          <p className="empty">Nenhum pensamento publicado, <Link to={`add`}>clique aqui</Link> para adicionar um.</p>
        )
      }
      {
        !thoughts.length && activeLoader && (
          <Loader />
        )
      }
    </div>
  )
}