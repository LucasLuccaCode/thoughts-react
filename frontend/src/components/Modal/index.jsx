import "./styles.css"

export default function Modal({ children, statusModal, closeModal }) {
  if (!statusModal) return null

  const handleCloseModal = e => {
    const { dataset } = e.target
    const key = Object.keys(dataset)[0]
    if (key === "modal") closeModal()
  }

  return (
    <div className="c-modal" data-modal onClick={handleCloseModal}>
      <button className="c-modal__close" onClick={() => closeModal()}>X</button>
      {children}
    </div>
  )
}