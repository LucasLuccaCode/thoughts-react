import { Form } from "react-router-dom";
import { useAuth } from "../../../../contexts/auth"
import { useMessage } from "../../../../contexts/message"
import { api } from "../../../../services/api";
import "./styles.css"

export default function Thought({ thought, setThoughts }) {
  const { user } = useAuth()
  const { setMessage } = useMessage()

  const likes = JSON.stringify(thought.likes)
  const iconLike = likes.includes(user?.id) ? 'heart-fill' : 'heart'

  const handleLike = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData(e.target)
      const { thoughtId } = Object.fromEntries(formData)

      const { data } = await api.post(`/thoughts/${thoughtId}/like`)

      setMessage({})

      const likeTransaction = prevThoughts => {
        const { like, statusLike } = data
        const thoughtIndex = prevThoughts.findIndex(({ id }) => id == thoughtId)
        const thought = { ...prevThoughts[thoughtIndex] }

        if (statusLike) {
          thought.likes.push(like)
        } else {
          const likeIndex = thought.likes.findIndex(({ userId }) => userId == user.id)
          thought.likes.splice(likeIndex, 1)
        }

        prevThoughts.splice(thoughtIndex, 1, thought)
        return prevThoughts
      }

      setThoughts(likeTransaction)
    } catch ({ response }) {
      setMessage({ error: response.data.error })
    }
  }

  return (
    <li className="c-home__thoughts__post">
      <h2>&#8220;{thought.content}&#8221;</h2>
      <h3>by <span>{thought.author.name}</span></h3>
      <ul className="c-home__thoughts__actions">
        <li className="like">
          <Form onSubmit={handleLike}>
            <input type="hidden" name="thoughtId" value={thought.id} />
            <button type="submit">
              <i className={`bi bi-${iconLike}`}></i>
              <span>{thought.likes.length}</span>
            </button>
          </Form>
        </li>
        <li className="comments">
          <Form action={`/thoughts/${thought.id}/comments`}>
            <button type="submit">
              <i className="bi bi-chat-dots"></i>
              <span>0</span>
            </button>
          </Form>
        </li>
        <li className="favorite">
          <Form action={`/thoughts/${thought.id}/favorite`}>
            <button type="submit">
              <i className="bi bi-star"></i>
              <span>0</span>
            </button>
          </Form>
        </li>
      </ul>
    </li>
  )
}