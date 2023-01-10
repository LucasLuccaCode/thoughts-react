import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import "./styles.css"

export default function Header() {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

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
          {
            user ? (
              <>
                <li>
                  <Link to={`/dashboard`}>Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>{user.name}</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={`/login`}>Entrar</Link>
                </li>
                <li>
                  <Link to={`/register`}>Registrar</Link>
                </li>
              </>
            )
          }
        </ul>
      </nav>
    </header >
  )
}