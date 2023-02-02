import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./styles.css"

export default function Modal({ children }) {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  const handleCloseModal = e => {
    const { dataset } = e.target
    const key = Object.keys(dataset)[0]
    if (key === "modal") navigate(-1)
  }

  return (
    <div className="c-modal" data-modal onClick={handleCloseModal}>
      <button className="c-modal__close" onClick={() => navigate(-1)}>X</button>
      <div className="c-modal__content">
        {children}
      </div>
    </div>
  )
}