import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMessage } from '../../../../../contexts/messageContext'
import { api } from '../../../../../services/api'
import './styles.css'

export default function Actions({ userId, likes, thoughtId }) {
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
        <button type="submit">
          <i className="bi bi-chat-dots"></i>
          <span>0</span>
        </button>
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