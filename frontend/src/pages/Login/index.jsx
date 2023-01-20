import { Navigate } from "react-router-dom"
import { useAuth } from "../../contexts/authContext"

import UserForm from "../../components/UserForm"

export default function Login() {
  const { sigIn, authenticated } = useAuth()

  const handleSigIn = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    sigIn(data)
  }

  if (authenticated)
    return <Navigate to={`/dashboard`} />

  return (
    <div className="c-auth page max-width">
      <h1>Entre na sua conta</h1>

      <UserForm action="login" btnText="Entrar" handleForm={handleSigIn} />
    </div>
  )
}