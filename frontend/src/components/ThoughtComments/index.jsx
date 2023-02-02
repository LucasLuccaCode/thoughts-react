import { useEffect } from 'react'
import { useRef } from 'react'
import Comment from './Comment'
import './styles.css'

export default function ThoughtComments({ comments }) {
  const commentsRef = useRef()

  useEffect(() => {
    if (commentsRef.current) {
      commentsRef.current.lastElementChild?.scrollIntoView()
    }
  }, [])

  return (
    <div className="c-thoughts__comments__container">


      {
        comments.length ? (
          <>
            <div className="c-thoughts__comments__title">
              <div className="show-more">Mostrar mais</div>
              <div className="status-pagination">{comments.length} / {comments.length}</div>
            </div>

            <ul className="c-thoughts__comments" ref={commentsRef}>
              {
                comments.map(comment => (
                  <Comment comment={comment} key={comment.id} />
                ))
              }
            </ul>
          </>
        ) : (
          <p className='no-comments'>Sem comentários...</p>
        )
      }



    </div>
  )
}