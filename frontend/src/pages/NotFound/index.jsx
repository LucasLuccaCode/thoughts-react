import { useRouteError } from "react-router-dom"

export default function NotFound() {
  const error = useRouteError()
  
  return (
    <div className="not-found">
      <h2>{error.status}</h2>
      <h2>{error.statusText}</h2>
    </div>
  )
}