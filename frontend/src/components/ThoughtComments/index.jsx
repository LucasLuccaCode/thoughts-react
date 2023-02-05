import { useEffect } from 'react'
import './styles.css'

import Comment from './Comment'
import { useComments } from '../../contexts/commentsContext'

export default function ThoughtComments({ comments }) {
  const { commentsPage, commentsRef, scrollIntoDown, perPage, nextComments } = useComments()

  useEffect(() => {
    if (commentsRef.current && commentsPage !== perPage ) scrollIntoDown()
  }, [comments])

  const currentComments = comments.slice(0, commentsPage)

  return (
    <div className="c-thoughts__comments__container">


      {
        currentComments.length ? (
          <>

            <ul className="c-thoughts__comments" ref={commentsRef}>
              {
                currentComments.map(comment => (
                  <Comment comment={comment} key={comment.id} />
                ))
              }
            </ul>

            {
              currentComments.length !== comments.length && (
                <div className="c-thoughts__comments__show_more">
                  <div className="show-more" onClick={nextComments}>Mostrar mais</div>
                  <div className="status-pagination">{currentComments.length} / {comments.length}</div>
                </div>
              )
            }
          </>
        ) : (
          <p className='no-comments'>Sem comentários...</p>
        )
      }



    </div>
  )
}