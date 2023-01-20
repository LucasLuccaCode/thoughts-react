import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useMessage } from "../../../contexts/messageContext"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { api } from "../../../services/api"
import ThoughtForm from "../../../components/ThoughtForm"
import Modal from "../../../components/Modal"

export default function CreateThought() {
  const { setMessage } = useMessage()
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(
    ({ data }) => api.post("/thoughts", data),
    {
      onSuccess: (data) => {
        setMessage({ success: data.data.message })
        queryClient.invalidateQueries('dashboard-thoughts')
        navigate(-1)
      },
      onError: (error) => {
        console.log(error)
        setMessage({ error: error.message })
      }
    }
  )

  const handleCreateThought = useCallback(async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)

    mutate({ data })
  }, [])

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