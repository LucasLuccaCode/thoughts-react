import './styles.css'

export default function Comment({ comment }) {

  const authorAvatar = 'https://montinkantigo.s3.amazonaws.com/data/camisas/pain---naruto-5bd112380051b-estampa-306.png'

  return (
    <li className="c-comments__card">
      <div className="avatar" style={{ backgroundImage: `url(${authorAvatar})` }}></div>

      <div className="c-comments__card__content">
        <h4>{ comment.author.name }</h4>

        <div className='comment-text'>{comment.content}</div>

        <ul className="c-comments__card__actions">
          <li>
            <a href="#">Curtir</a>
          </li>
          <li>
            <a href="#">Editar</a>
          </li>
          <li>
            <a href="#">Deletar</a>
          </li>
          <li>
            <a href="#">Responder</a>
          </li>
        </ul>
      </div>
    </li>
  )
}