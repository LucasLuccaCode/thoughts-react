import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import UserForm from "../../components/UserForm"
import { MessageContext } from "../../contexts/message"
import { api } from "../../services/api"

export default function Register() {
  const navigate = useNavigate()
  const { setMessage } = useContext(MessageContext)

  const handleSignUp = async (e) => {
    e.preventDefault()
    setMessage()

    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData);

      const res = await api.post("/register", data)
      console.log(res)

      setMessage({ success: res.data.message })
      return navigate("/login")
    } catch ({ response}) {
      setMessage({ error: response.data.error })
    }
  }

  return (
    <div className="c-auth page max-width">
      <h1>Cadastre-se</h1>

      <UserForm action="register" btnText="Cadastrar" handleForm={handleSignUp} />
    </div>
  )
}