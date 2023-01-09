import { useContext, useEffect, useRef } from "react"
import { MessageContext } from "../../contexts/message"
import "./styles.css"

export default function Messages() {
  const { message, setMessage } = useContext(MessageContext)
  const timer = useRef()

  useEffect(() => {
    timer.current = setTimeout(() => {
      setMessage(null)
      clearTimeout(timer.current)
    }, 4000);

    return () => {
      clearTimeout(timer.current);
    };
  }, [message])

  return (
    <div className="c-messages max-width">
      {message?.error && <p className="error">{message?.error}</p>}
      {message?.success && <p className="success">{message?.success}</p>}
    </div>
  )
}