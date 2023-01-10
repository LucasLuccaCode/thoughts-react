import { Form, Link, useLoaderData, useNavigation } from "react-router-dom"
import Loader from "../../components/Loader";
import { api } from "../../services/api";
import "./styles.css"

export async function loader({ request }) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search");
  const queryParams = Object.fromEntries(url.searchParams)

  try {
    const { data } = await api.get("/thoughts", {
      params: queryParams
    })

    if (data.error) {
      throw new Response("", {
        status: 404,
        statusText: data.error,
      });
    }

    return { search: search || '', thoughts: data.thoughts };
  } catch (error) {
    console.log(error)
    throw error
  }
}


export default function Home() {
  const { search, thoughts } = useLoaderData()
  const navigation = useNavigation()

  return (
    <div className="c-home__thoughts">
      <div className="c-home__thoughts__title max-width">
        {
          search ? (
            <h1>Você está buscando por: <span>{search}</span></h1>
          ) : (
            <h1>Feed de pensamentos</h1>
          )
        }

        <Form className="c-home__thoughts__search" action="/" method="GET">
          <input type="search" name="search" defaultValue={search} placeholder="Procure por um pensamento" />
          <input className="btn" type="submit" value="Buscar" />
        </Form>

        <div className="c-home__thoughts__order">
          <span>Ordenar por:</span>

          <Form action="/">
            <input type="hidden" name="search" value={search} />
            <input type="hidden" name="order" value="new" />
            <button type="submit">
              <i className="bi bi-arrow-up"></i>
            </button>
          </Form>
          <Form action="/">
            <input type="hidden" name="search" value={search} />
            <input type="hidden" name="order" value="old" />
            <button type="submit">
              <i className="bi bi-arrow-down"></i>
            </button>
          </Form>
          <Link to={`/`}>Limpar</Link>
        </div>
      </div>

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
        )  : (
          <Loader />
        )
      }

      {
        !thoughts?.length && (
          <p className="empty">Nenhum pensamento publicado ainda...</p>
        )
      }
    </div>
  )
}