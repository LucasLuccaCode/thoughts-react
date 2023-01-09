import { Link, Outlet } from "react-router-dom"
import DashboardThoughts from "../../components/DashboardThoughts"
import { ThoughtsProvider } from "../../contexts/thoughts"
import "./styles.css"

export default function Dashboard() {
  return (
    <div className="c-dashboard page">
      <div className="c-dashboard__title">
        <h1>Dashboard</h1>
        <Link className="btn" to={`add`}>Adicionar pensamento</Link>
      </div>

      <ThoughtsProvider>
        <DashboardThoughts />

        <div className="c-dashboard__detail">
          <Outlet />
        </div>
      </ThoughtsProvider>
    </div>
  )
}