import { useState } from "react"
import { useNavigation } from "react-router-dom"
import Loader from "../../../components/Loader"
import Thought from "./Thought"
import "./styles.css"

export default function Thoughts({ thoughts, setThoughts }) {
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
                  <Thought thought={thought} setThoughts={setThoughts} key={thought.id} />
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