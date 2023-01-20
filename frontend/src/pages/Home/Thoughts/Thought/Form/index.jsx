import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useMessage } from "../../../../../contexts/messageContext"
import { api } from "../../../../../services/api"
import './styles.css'

export default function Form({ userId, thoughtId }) {
  const [content, setContent] = useState("")
  const { setMessage } = useMessage()

  const queryClient = useQueryClient()

  const { mutate } = useMutation(
    () => api.post(`/thoughts/${thoughtId}/comments`, { userId, thoughtId, content }),
    {
      retry: false,
      onSuccess: (data) => {
        setContent("")
        queryClient.invalidateQueries('home-thoughts')
      },
      onError: (error) => {
        setMessage({ error: error?.response?.data?.error || error.message })
      }
    }
  )
  const userAvatar = 'https://montinkantigo.s3.amazonaws.com/data/camisas/pain---naruto-5bd112380051b-estampa-306.png'

  const handleForm = e => {
    e.preventDefault()
    mutate()
  }

  return (
    <form onSubmit={handleForm} className="c-thoughts__form" method="POST">
      <div className="avatar" style={{ backgroundImage: `url(${userAvatar})` }}></div>
      <input
        type="text"
        name="content"
        className="c-thoughts__form__content"
        placeholder="Escreva um comentário aqui"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
    </form>
  )
}