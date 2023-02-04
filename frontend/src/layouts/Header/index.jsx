import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import "./styles.css"

export default function Header() {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  const avatarUrl = user?.avatar
    ? user.avatar
    : 'https://montinkantigo.s3.amazonaws.com/data/camisas/pain---naruto-5bd112380051b-estampa-306.png'

  return (
    <header className="c-header">
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
                  <Link to={`/favorites`}>Favoritos</Link>
                </li>
                <li>
                  <Link to={`/dashboard`}>Dashboard</Link>
                </li>
                <li title="Sair">
                  <button onClick={handleLogout}>
                    <img src={avatarUrl} className="avatar" alt={`Foto de perfil do ${user.name}`} />
                    {user.name}
                  </button>
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