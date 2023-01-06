import { useContext, useEffect } from "react"
import { MessageContext } from "../../contexts/message"
import "./styles.css"

export default function Messages() {
  const { message, setMessage } = useContext(MessageContext)

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null)
      clearTimeout(timer)
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [message])

  return (
    <div className="c-messages max-width">
      {message?.error && <p className="error">{message?.error}</p>}
      {message?.success && <p className="success">{message?.success}</p>}
    </div>
  )
}