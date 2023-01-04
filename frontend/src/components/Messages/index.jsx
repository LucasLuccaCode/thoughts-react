export default function Messages({ messages }) {
  return (
    <div className="c-messages max-width">
      {
        messages.error && <p class="error">{messages.error}</p>
      }
      {
        messages.success && <p class="success">{messages.success}</p>
      }
    </div>
  )
}