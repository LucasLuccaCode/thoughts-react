import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./styles.css"

import { api } from "../../../../services/api";
import { useAuth } from "../../../../contexts/authContext"
import { useMessage } from "../../../../contexts/messageContext"
import { memo } from "react";

function Thought({ thought }) {
  const { user } = useAuth()
  const { setMessage } = useMessage()


  const queryClient = useQueryClient()

  const { mutate, isLoading, error } = useMutation(
    (thoughtId) => api.post(`/thoughts/${thoughtId}/like`),
    {
      retry: false,
      onSuccess: (data) => {
        setMessage({ success: data.data.message })
        queryClient.invalidateQueries('dashboard-thoughts')
      },
      onError: (error) => {
        console.log(error)
        setMessage({ error: error.message })
      }
    }
  )

  const likes = JSON.stringify(thought.likes)
  const iconLike = likes.includes(`{"userId":${user?.id}}`) || isLoading ? 'heart-fill' : 'heart'

  return (
    <li className="c-home__thoughts__post">
      <h2>&#8220;{thought.content}&#8221;</h2>
      <h3>by <span>{thought.author.name}</span></h3>
      <ul className="c-home__thoughts__actions">
        <li className="like">
          <button type="submit" onClick={() => mutate(thought.id)}>
            <i className={`bi bi-${iconLike}`}></i>
            <span>{thought.likes.length}</span>
          </button>
        </li>
        <li className="comments">
          <button type="submit">
            <i className="bi bi-chat-dots"></i>
            <span>0</span>
          </button>
        </li>
        <li className="favorite">
          <button type="submit">
            <i className="bi bi-star"></i>
            <span>0</span>
          </button>
        </li>
      </ul>
    </li>
  )
}

export default memo(Thought)