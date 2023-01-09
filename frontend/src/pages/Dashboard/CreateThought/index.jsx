import { MessageContext } from "../../../contexts/message"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { api } from "../../../services/api"
import ThoughtForm from "../../../components/ThoughtForm"
import Modal from "../../../components/Modal"
import { ThoughtsContext } from "../../../contexts/thoughts"

export default function CreateThought() {
  const navigate = useNavigate()
  const { setMessage } = useContext(MessageContext)
  const { setThoughts } = useContext(ThoughtsContext)

  const handleCreateThought = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)

    try {
      const { data: res } = await api.post("/thoughts", data)

      setMessage({ success: res.message })
      setThoughts(prevThoughts => [res.thought, ...prevThoughts])
      return navigate(-1)
    } catch ({ response }) {
      setMessage({ error: response.data.error })
    }
  }

  return (
    <Modal>
      <div className="c-modal__content">
        <h1>Publicar pensamento</h1>

        <ThoughtForm
          thought={{}}
          btnText="Adicionar"
          handleForm={handleCreateThought}
        />
      </div>
    </Modal>
  )
}