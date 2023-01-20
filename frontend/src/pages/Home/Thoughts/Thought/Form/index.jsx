import { Form } from "react-router-dom";
import './styles.css'

export default function FormComment({ userId, thoughtId }) {

  const userAvatar = 'https://montinkantigo.s3.amazonaws.com/data/camisas/pain---naruto-5bd112380051b-estampa-306.png'

  return (
    <Form className="c-thoughts__form" method="POST">
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="thoughtId" value={thoughtId} />
      <div className="avatar" style={{ backgroundImage: `url(${userAvatar})` }}></div>
      <input
        type="text"
        name="content"
        className="c-thoughts__form__content"
        placeholder="Escreva um comentário aqui"
      />
    </Form>
  )
}