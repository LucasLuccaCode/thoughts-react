import "./styles.css"

export default function ThoughtInfo({ thought }) {
  return (
    <div className="c-thoughts__card__header">
      <h2>&#8220;{thought.content}&#8221;</h2>
      <h3>by <span>{thought.author.name}</span></h3>
    </div>
  )
}