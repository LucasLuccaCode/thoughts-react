import { Form, Link } from "react-router-dom";

export default function HomeTitle({ search }) {
  return (
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
  )
}