import { Form, Link } from "react-router-dom"
import "./styles.css"

export default function UserForm({ action, btnText }) {
  return (
    <Form method="POST" className="c-form">
      {
        action !== "login" && (
          <div className="c-form__input">
            <label htmlFor="name">Nome: </label>
            <input type="text" name="name" id="name" required autoFocus />
          </div>
        )
      }
      <div className="c-form__input">
        <label htmlFor="email">Email: </label>
        <input type="email" name="email" id="email" required />
      </div>
      <div className="c-form__input">
        <label htmlFor="password">Senha: </label>
        <input type="password" name="password" id="password" required />
      </div>
      {
        action !== "login" && (
          <div className="c-form__input">
            <label htmlFor="confirm_password">Confirmar senha: </label>
            <input type="password" name="confirm_password" id="confirm_password" required />
          </div>
        )
      }
      <input className="btn" type="submit" value={btnText} />
      {
        action === "login" ? (
          <p>Não tem uma conta? <Link to={`/register`}>Clique aqui</Link></p>
        ) : (
          <p>Tem uma conta? <Link to={`/login`}>Clique aqui</Link></p>
        )
      }
    </Form>
  )
}