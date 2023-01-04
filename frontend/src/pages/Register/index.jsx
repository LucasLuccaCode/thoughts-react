import UserForm from "../../components/UserForm"

export const action = async ({ params, request }) => {
  try {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    const dataJson = JSON.stringify(updates)

    const res = await fetch(`http://localhost:3000/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: dataJson
      }
    );
    const data = await res.json()
    console.log(data)
    if (!res.error) throw res.error;
    
    return { ok: true };
  } catch (error) {
    console.log(error)
  }
}

export default function Register() {
  return (
    <div className="c-auth page max-width">
      <h1>Cadastre-se</h1>

      <UserForm action="register" btnText="Cadastrar" />
    </div>
  )
}