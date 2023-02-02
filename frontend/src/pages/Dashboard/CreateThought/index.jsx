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
      retry: false,
      onSuccess: (data) => {
        setMessage({ success: data.data.message })
        queryClient.invalidateQueries('dashboard-thoughts')
        navigate(-1)
      },
      onError: (error) => {
        setMessage({ error: error?.response?.data?.error || error.message })
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
      <h1>Publicar pensamento</h1>

      <ThoughtForm
        thought={{}}
        btnText="Adicionar"
        handleForm={handleCreateThought}
      />
    </Modal>
  )
}