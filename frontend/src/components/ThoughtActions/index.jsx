import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import './styles.css'

import { api } from '../../services/api'
import { useMessage } from '../../contexts/messageContext'

export default function ThoughtActions({ userId, likes, fans, thoughtId, totalComments }) {
  const { setMessage } = useMessage()

  const queryClient = useQueryClient()

  const { mutate } = useMutation(
    async (action) => {
      const allowedActions = {
        async like() {
          await api.post(`/thoughts/${thoughtId}/like`)
        },
        async favorite() {
          await api.post(`/users/favorite`, {
            userId,
            thoughtId
          })
        },
      }

      const fn = allowedActions[action]
      if (fn) await fn()
    },
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

  const favoritesJson = JSON.stringify(fans)
  const iconFavorite = favoritesJson.includes(`{"id":${userId}}`) ? 'star-fill' : 'star'

  return (
    <ul className="c-thoughts__actions">
      <li id="like">
        <button type="submit" onClick={() => mutate('like')}>
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
        <button type="submit" onClick={() => mutate('favorite')}>
          <i className={`bi bi-${iconFavorite}`}></i>
          <span>{fans.length}</span>
        </button>
      </li>
    </ul>
  )
}