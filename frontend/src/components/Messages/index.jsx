import { useContext } from "react"
import { MessageContext } from "../../contexts/message"
import "./styles.css"

export default function Messages() {
  const { message } = useContext(MessageContext)

  return (
    <div className="c-messages max-width">
      { message.error && <p className="error">{message.error}</p> }
      { message.success && <p className="success">{message.success}</p> }
    </div>
  )
}