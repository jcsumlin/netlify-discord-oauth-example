import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './Pages/ErrorPage'
import AuthenticatedPage from './Pages/AuthenticatedPage'
import { CssBaseline } from '@mui/material'
import GlobalWrapper from './Components/GlobalWrapper'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
const router = createBrowserRouter([
  {
    path: '/',
    element: <GlobalWrapper/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App/>
      },
      {
        path: '/dashboard',
        element: <AuthenticatedPage/>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <AuthenticatedPage/>
  }
])

root.render(
  <React.StrictMode>
      <CssBaseline />
      <RouterProvider router={router} />
  </React.StrictMode>
)
