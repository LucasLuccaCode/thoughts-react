import { useNavigate } from "react-router-dom"
import "./styles.css"

export default function Modal({ children }) {
  const navigate = useNavigate()

  const handleCloseModal = e => {
    const { dataset } = e.target
    const key = Object.keys(dataset)[0]
    if (key === "modal") navigate(-1)
  }

  return (
    <div className="c-modal" data-modal onClick={handleCloseModal}>
      <button className="c-modal__close" data-modal onClick={handleCloseModal}>X</button>
      {children}
    </div>
  )
}