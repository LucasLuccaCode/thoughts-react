import { api } from "../../services/api"
import { MessageContext } from "../../contexts/message"
import { useContext } from "react"
import ThoughtForm from "../ThoughtForm"

export default function CreateThought({ setThoughts, closeModal }) {
  const { setMessage } = useContext(MessageContext)

  const handleCreateThought = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)

    try {
      const res = await api.post("/thoughts", data)

      setMessage({ success: res.data.message })
      setThoughts(prevState => [res.data.thought, ...prevState])
      closeModal()
    } catch ({ response }) {
      setMessage({ error: response.data.error })
    }
  }

  return (
    <div className="c-modal__content">
      <h1>Publicar pensamento</h1>

      <ThoughtForm
        thought={{}}
        btnText="Adicionar"
        handleForm={handleCreateThought}
      />
    </div>
  )
}