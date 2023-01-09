import { useContext, useEffect, useState } from "react"
import { Form, Link } from "react-router-dom"
import { AuthContext } from "../../contexts/auth"
import { ThoughtsContext } from "../../contexts/thoughts"
import Loader from "../Loader"
import "./styles.css"


export default function DashboardThoughts() {
  const { thoughts, updateThoughts } = useContext(ThoughtsContext)
  const [activeLoader, setActiveLoader] = useState(true)
  const { user } = useContext(AuthContext)

  useEffect(() => {
    updateThoughts(user.id)
      .finally(() => setActiveLoader(false))
  }, [])


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