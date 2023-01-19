import React from 'react'
import { RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import './index.css'

import { AuthProvider } from './contexts/auth'
import { MessageProvider } from './contexts/message'

import router from './routes/index'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MessageProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </MessageProvider>
  </React.StrictMode>,
)
