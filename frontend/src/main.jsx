import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import './index.css'

import { MessageProvider } from './contexts/message'


// Pages
import Root from './pages/Root'

import NotFound from './pages/NotFound'

import Register from './pages/Register'

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
        element: <Register />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MessageProvider>
      <RouterProvider router={router} />
    </MessageProvider>
  </React.StrictMode>,
)
