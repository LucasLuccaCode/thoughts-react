import { useContext, useEffect, useState } from "react"
import { Form, Link } from "react-router-dom"
import { AuthContext } from "../../../contexts/auth"
import { MessageContext } from "../../../contexts/message"
import { ThoughtsContext } from "../../../contexts/thoughts"
import { api } from "../../../services/api"
import Loader from "../../../components/Loader"
import "./styles.css"


export default function DashboardThoughts() {
  const { thoughts, updateThoughts } = useContext(ThoughtsContext)
  const [activeLoader, setActiveLoader] = useState(true)
  const { user } = useContext(AuthContext)
  const { setMessage } = useContext(MessageContext)

  useEffect(() => {
    updateThoughts(user.id)
      .finally(() => setActiveLoader(false))
  }, [])

  const handleDeleteThought = async (e) => {
    e.preventDefault()
    setMessage()

    try {
      const formData = new FormData(e.target);
      const { thoughtId } = Object.fromEntries(formData);

      const { data } = await api.delete(`/thoughts/${thoughtId}`)

      await updateThoughts(user.id)
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
          <ul className="c-dashboard__thoughts">
            {
              thoughts.map(thought => (
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