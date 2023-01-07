import { useContext, useEffect, useState } from "react"
import { Form, Link } from "react-router-dom"
import Loader from "../../components/Loader"
import { AuthContext } from "../../contexts/auth"
import { MessageContext } from "../../contexts/message"
import { api } from "../../services/api"
import "./styles.css"

export default function Dashboard() {
  const [thoughts, setThoughts] = useState([])
  const [activeLoader, setActiveLoader] = useState(true)
  const { user } = useContext(AuthContext)
  const { setMessage } = useContext(MessageContext)

  useEffect(() => {
    const getThoughts = async () => {
      try {
        const { data } = await api.get(`/users/${user.id}`)

        setThoughts(data.user.thoughts)
      } catch ({ response }) {
        setMessage({ error: response.data.error })
      } finally {
        setActiveLoader(false)
      }
    }
    getThoughts()
  }, [])

  return (
    <div className="c-dashboard page">
      <div className="c-dashboard__title">
        <h1>Dashboard</h1>
        <Link className="btn" to={`/thoughts/add`}>Adicionar pensamento</Link>
      </div>

      <h2>Seus pensamentos: </h2>

      {
        !!thoughts.length && (
          <ul className="c-dashboard__thoughts">
            {
              thoughts.map(thought => (
                <li key={thought.id}>
                  <h3>&#8220; {thought.content} &#8220;</h3>
                  <div className="c-dashboard__thoughts__actions">
                    <Link className="btn" to={`/thoughts/${thought.id}/edit`}>Editar</Link>
                    <Form action={`/thoughts/${thought.id}`} method="DELETE">
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
          <p className="empty">Nenhum pensamento publicado, <Link to={`/thoughts/add`}>clique aqui</Link> para adicionar um.</p>
        )
      }
      {
        activeLoader && <Loader />
      }
    </div>
  )
}