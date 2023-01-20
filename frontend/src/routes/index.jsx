import { createBrowserRouter } from 'react-router-dom'

// Pages
import Root from '../pages/Root'
import NotFound from '../pages/NotFound'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import DashboardCreate from '../pages/Dashboard/CreateThought'
import DashboardEditThought from '../pages/Dashboard/EditThought'
import Home from '../pages/Home'

import { PrivateRoute } from "./privateRoutes"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/dashboard",
        element: <PrivateRoute />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
            children: [
              {
                path: "add",
                element: <DashboardCreate />
              },
              {
                path: ":thoughtId/edit",
                element: <DashboardEditThought />
              }
            ]
          }
        ]
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      }
    ]
  }
])

export default router