import Comment from './Comment'
import './styles.css'

export default function Comments({ comments }) {
  console.log(comments)

  return (
    <div className="c-thoughts__comments__container">

      <div className="c-thoughts__comments__title">
        <div className="show-more">Mostrar mais</div>
        <div className="status-pagination">{comments.length} / {comments.length}</div>
      </div>

      <ul className="c-thoughts__comments">
        {
          comments.map(comment => (
            <Comment comment={comment} key={comment.id} />
          ))
        }
      </ul>


    </div>
  )
}