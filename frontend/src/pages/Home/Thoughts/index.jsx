import { Link, useNavigation } from "react-router-dom"
import Loader from "../../../components/Loader"

export default function Thoughts({ thoughts }) {
  const navigation = useNavigation()

  return (
    <>
      {
        thoughts?.length && navigation.state !== "loading" ? (
          <ul className="c-home__thoughts__posts max-width">
            {
              thoughts.map(thought => (
                <li key={thought.id}>
                  <h2>&#8220;{thought.content}&#8221;</h2>
                  <h3>by <span>{thought?.author?.name}</span></h3>
                  <ul className="c-home__thoughts__actions">
                    <li className="like">
                      <Link to={`/thoughts/${thought.id}/like`}>
                        <i className="bi bi-heart"></i>
                        <span>0</span>
                      </Link>
                    </li>
                    <li className="comments">
                      <Link to={`/thoughts/${thought.id}/comments`}>
                        <i className="bi bi-chat-dots"></i>
                        <span>0</span>
                      </Link>
                    </li>
                    <li className="favorite">
                      <Link to={`/thoughts/${thought.id}/favorite`}>
                        <i className="bi bi-star"></i>
                        <span>0</span>
                      </Link>
                    </li>
                  </ul>
                </li>
              ))
            }
          </ul>
        ) : (
          <Loader />
        )
      }

      {
        !thoughts?.length && (
          <p className="empty">Nenhum pensamento publicado ainda...</p>
        )
      }
    </>
  )
}