import { useMessage } from "../../../contexts/messageContext"
import { useNavigate, useParams } from "react-router-dom"
import { useCallback } from "react"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from "../../../services/api"

import ThoughtForm from "../../../components/ThoughtForm"
import Modal from "../../../components/Modal"

export default function EditThought() {
  const { setMessage } = useMessage()
  const { thoughtId } = useParams()
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { data, error } = useQuery(
    [`thought-${thoughtId}`],
    () => api.get(`/thoughts/${thoughtId}`),
    {
      staleTime: Infinity,
      retry: false
    }
  )

  const { mutate, isLoading } = useMutation(
    ({ thoughtId, data }) => api.put(`/thoughts/${thoughtId}`, data),
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

  const thought = data?.data.thought

  const handleEditThought = useCallback(async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)

    mutate({ thoughtId, data })
  }, [thought])

  if (error) {
    setMessage({ error: error.message || 'Erro desconhecido' })
    return
  }

  return (
    <Modal>
      <div className="c-modal__content">
        <h1>Editar pensamento</h1>

        <ThoughtForm
          thought={thought}
          btnText="Atualizar"
          handleForm={handleEditThought}
          isLoading={isLoading}
        />
      </div>
    </Modal>
  )
}