import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Pages
import NotFound from './pages/NotFound'
import Root from './pages/Root'
import Register, {
  action as registerAction
} from './pages/Register'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <h1>Pensamentos</h1>
      },
      {
        path: "login",
        element: <h1>Login</h1>
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
