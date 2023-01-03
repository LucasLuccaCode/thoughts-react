import { Link } from "react-router-dom";
import "./styles.css"

export default function Header() {

  return (
    <header>
      <nav>
        <Link to={`/`} id="logo">
          <img src="/img/thoughts_logo.png" alt="Thoughts" />
          <span>Thoughts</span>
        </Link>

        <ul>
          <li>
            <Link to={`/`}>Pensamentos</Link>
          </li>
          {/* <li>
            <Link to={`/thoughts/dashboard`}>Dashboard</Link>
          </li>
          <li>
            <Link to={`/logout`}>Sair</Link>
          </li> */}
          <li>
            <Link to={`/login`}>Entrar</Link>
          </li>
          <li>
            <Link to={`/register`}>Registrar</Link>
          </li>
        </ul>
      </nav>
    </header >
  )
}