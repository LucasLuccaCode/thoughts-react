import { Form } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

export default function ThoughtForm({ thought, btnText, handleForm }) {
  const { user } = useAuth()

  return (
    <Form method="POST" onSubmit={handleForm} className="c-form max-width">
      <input type="hidden" name="userId" value={user?.id || ''} />
      <input type="hidden" name="thoughtId" value={thought?.id || ''} />
      <div className="c-form__input">
        <textarea
          name="content"
          placeholder="Digite seu pensamento aqui..."
          autoFocus
          defaultValue={thought?.content}
        >
        </textarea>
      </div>
      <input className="btn" type="submit" value={btnText} />
    </Form>
  )
}