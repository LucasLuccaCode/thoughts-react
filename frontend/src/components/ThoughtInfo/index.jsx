import "./styles.css"
import { formatDate } from '../../utils/formateDate'

export default function ThoughtInfo({ thought }) {
  const userAvatar = 'https://montinkantigo.s3.amazonaws.com/data/camisas/pain---naruto-5bd112380051b-estampa-306.png'
  
  return (
    <div className="c-thoughts__card__header">
      <div className="c-thoughts__header__title">
        <div className="avatar" style={{ backgroundImage: `url(${userAvatar})` }}></div>

        <div className="c-thoughts__header__info">
          <h2>{thought.author.name}</h2>
          <span>{formatDate(thought.createdAt)}</span>
        </div>
      </div>

      <h3>&#8220;{thought.content}&#8221;</h3>
    </div>
  )
}