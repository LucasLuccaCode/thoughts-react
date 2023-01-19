import { useMessage } from "../../../contexts/message"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useThoughts } from "../../../contexts/thoughts"
import { api } from "../../../services/api"
import ThoughtForm from "../../../components/ThoughtForm"
import Modal from "../../../components/Modal"

export default function EditThought() {
  const navigate = useNavigate()
  const [thought, setThought] = useState("")
  const { setMessage } = useMessage()
  const { updateThoughtsByUserId } = useThoughts()
  const { thoughtId } = useParams()

  useEffect(() => {
    const getThought = async () => {
      const { data } = await api.get(`/thoughts/${thoughtId}`)
      setThought(data.thought)
    }
    getThought()
  }, [])


  const handleEditThought = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)

    try {
      const { data: res } = await api.put(`/thoughts/${data.thoughtId}`, data)

      setMessage({ success: res.message })
      await updateThoughtsByUserId(data.userId)
      return navigate(-1)
    } catch ({ response }) {
      setMessage({ error: response.data.error })
    }
  }

  return (
    <Modal>
      <div className="c-modal__content">
        <h1>Editar pensamento</h1>

        <ThoughtForm
          thought={thought}
          btnText="Atualizar"
          handleForm={handleEditThought}
        />
      </div>
    </Modal>
  )
}