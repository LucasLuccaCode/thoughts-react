import Comment from './Comment'
import './styles.css'

export default function Comments({ comments }) {
  
  console.log(comments)

  return (
    <div className="c-thoughts__comments__container">

      <div className="c-thoughts__comments__title">
        <div className="show-more">
          Mostrar mais
        </div>
        <div className="status-pagination">
          5 / 36
        </div>
      </div>

      <ul className="c-thoughts__comments">
        <Comment comment={comments[0]} />
      </ul>


    </div>
  )
}