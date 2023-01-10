import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import './index.css'

import { MessageProvider } from './contexts/message'

// Pages
import Root from './pages/Root'
import NotFound from './pages/NotFound'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import DashboardCreate from './pages/Dashboard/CreateThought'
import DashboardEditThought from './pages/Dashboard/EditThought'

import { PrivateRoute } from "./routes/privateRoutes"
import { AuthProvider } from './contexts/auth'
import Home, {
  loader as homeLoader
} from './pages/Home'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: homeLoader, 
        errorElement: <NotFound />
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MessageProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </MessageProvider>
  </React.StrictMode>,
)
