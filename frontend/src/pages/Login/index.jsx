import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import UserForm from "../../components/UserForm"
import { MessageContext } from "../../contexts/message"
import { api } from "../../services/api"

export default function Login() {
  const navigate = useNavigate()
  const { setMessage } = useContext(MessageContext)

  const handleSigIn = async (e) => {
    e.preventDefault()
    setMessage()

    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData);

      const res = await api.post("/login", data)

      setMessage({ success: res.data.message })
      return navigate("/dashboard")
    } catch ({ response}) {
      setMessage({ error: response.data.error })
    }
  }

  return (
    <div className="c-auth page max-width">
      <h1>Entre na sua conta</h1>

      <UserForm action="login" btnText="Entrar" handleForm={handleSigIn} />
    </div>
  )
}