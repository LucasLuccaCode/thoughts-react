import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/auth"
import { MessageContext } from "../../contexts/message"
import { api } from "../../services/api"

import UserForm from "../../components/UserForm"

export default function Login() {
  const navigate = useNavigate()
  const { setMessage } = useContext(MessageContext)
  const { authenticate, authenticated } = useContext(AuthContext)

  const handleSigIn = async (e) => {
    e.preventDefault()
    setMessage()

    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData);

      const res = await api.post("/login", data)
      authenticate(res.data)
      
      setMessage({ success: res.data.message })
    } catch ({ response}) {
      setMessage({ error: response.data.error })
    }
  }

  if(authenticated) return navigate("/dashboard")

  return (
    <div className="c-auth page max-width">
      <h1>Entre na sua conta</h1>

      <UserForm action="login" btnText="Entrar" handleForm={handleSigIn} />
    </div>
  )
}