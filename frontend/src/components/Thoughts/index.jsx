import { useCallback, useState } from "react"
import "./styles.css"

import Thought from "../Thought"

export default function Thoughts({ thoughts }) {
  const [currentPage, setCurrentPage] = useState(10)

  const nextPage = useCallback(() => {
    const perPage = 10
    const nextPage = currentPage + perPage
    const newCurrentPage = Math.min(nextPage, thoughts.length)
    setCurrentPage(newCurrentPage)
  }, [thoughts])

  return (
    <div className="c-home__thoughts">
      {
        thoughts?.length ? (
          <>
            <ul className="c-home__thoughts__posts max-width">
              {
                thoughts?.slice(0, currentPage).map(thought => (
                  <Thought thought={thought} key={thought.id} />
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
          <p className="empty">Nenhum pensamento publicado ainda...</p>
        )
      }
    </div>
  )
}