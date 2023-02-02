import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import './styles.css'

import { api } from '../../services/api'
import { useMessage } from '../../contexts/messageContext'

export default function ThoughtActions({ userId, likes, thoughtId, totalComments }) {
  const { setMessage } = useMessage()

  const queryClient = useQueryClient()

  const { mutate } = useMutation(
    () => api.post(`/thoughts/${thoughtId}/like`),
    {
      retry: false,
      onSuccess: (data) => {
        queryClient.invalidateQueries('dashboard-thoughts')
      },
      onError: (error) => {
        console.log(error)
        setMessage({ error: error.message })
      }
    }
  )

  const likesJson = JSON.stringify(likes)
  const iconLike = likesJson.includes(`{"userId":${userId}}`) ? 'heart-fill' : 'heart'

  return (
    <ul className="c-thoughts__actions">
      <li id="like">
        <button type="submit" onClick={() => mutate()}>
          <i className={`bi bi-${iconLike}`}></i>
          <span>{likes.length}</span>
        </button>
      </li>
      <li id="comments">
        <Link to={`/thought/${thoughtId}`}>
          <i className="bi bi-chat-dots"></i>
          <span>{totalComments}</span>
        </Link>
      </li>
      <li id="favorite">
        <button type="submit">
          <i className="bi bi-star"></i>
          <span>0</span>
        </button>
      </li>
    </ul>
  )
}