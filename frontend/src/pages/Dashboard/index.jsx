import { Link, Outlet } from "react-router-dom"
import { DashboardProvider } from "../../contexts/dashboardContext"
import "./styles.css"

import DashboardThoughts from "./DashboardThoughts"

export default function Dashboard() {
  return (
    <div className="c-dashboard page">
      <div className="c-dashboard__title">
        <h1>Dashboard</h1>
        <Link className="btn" to={`add`}>Adicionar pensamento</Link>
      </div>

      <DashboardProvider>
        <DashboardThoughts />

        <div className="c-dashboard__detail">
          <Outlet />
        </div>
      </DashboardProvider>
    </div>
  )
}