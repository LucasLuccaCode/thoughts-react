import { useState } from "react"
import { Link, useNavigation } from "react-router-dom"
import Loader from "../../../components/Loader"

export default function Thoughts({ thoughts }) {
  const [currentPage, setCurrentPage] = useState(10)
  const navigation = useNavigation()

  const nextPage = () => {
    const perPage = 10
    const nextPage = currentPage + perPage
    const newCurrentPage = Math.min(nextPage, thoughts.length)
    setCurrentPage(newCurrentPage)
  }

  return (
    <>
      {
        thoughts?.length && navigation.state !== "loading" ? (
          <>
            <ul className="c-home__thoughts__posts max-width">
              {
                thoughts?.slice(0, currentPage).map(thought => (
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
            {
              currentPage < thoughts.length && (
                <button className="btn more-thoughts" onClick={nextPage}>Mostrar mais</button>
              )
            }
          </>
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