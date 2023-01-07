import { useContext, useEffect, useState } from "react"
import { Form, Link } from "react-router-dom"
import { AuthContext } from "../../contexts/auth"
import { MessageContext } from "../../contexts/message"
import { api } from "../../services/api"
import Loader from "../../components/Loader"
import Modal from "../../components/Modal"
import CreateThought from "../../components/CreateThought"
import "./styles.css"

export default function Dashboard() {
  const [statusModal, setStatusModal] = useState(false)
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
        <button className="btn" onClick={() => setStatusModal(true)}>Adicionar pensamento</button>
        <Modal statusModal={statusModal} closeModal={() => setStatusModal(false)}>
          <CreateThought 
            setThoughts={setThoughts} 
            closeModal={() => setStatusModal(false)} 
          />
        </Modal>
      </div>

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
          <p className="empty">Nenhum pensamento publicado, <Link onClick={() => setStatusModal(true)}>clique aqui</Link> para adicionar um.</p>
        )
      }
      {
        activeLoader && <Loader />
      }
    </div>
  )
}