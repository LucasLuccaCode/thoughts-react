import { useState } from "react"
import { Link } from "react-router-dom"

export default function ThoughtCard({ thought, deleteThought }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleClick = () => {
    setIsDeleting(true)
    deleteThought()
  }

  return (
    <li key={thought.id}>
      <h3>&#8220; {thought.content} &#8220;</h3>
      <div className="c-dashboard__thoughts__actions">
        <Link className="btn" to={`${thought.id}/edit`}>Editar</Link>

        <button
          className="btn" onClick={handleClick}
        >
          {isDeleting ? 'Deletando...' : 'Deletar'}
        </button>
      </div>
    </li>
  )
}