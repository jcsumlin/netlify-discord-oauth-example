import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './Pages/ErrorPage'
import AuthenticatedPage from './Pages/AuthenticatedPage'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import GlobalWrapper from './Components/GlobalWrapper'
import Authorize from './Pages/Authorize'
import { AuthProvider, LocalStorageProvider } from '@reactivers/hooks'
import PrivateRoute from './Components/PrivateRoute'

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
        element: <PrivateRoute/>,
        children: [
          {
            path: '/dashboard',
            element: <AuthenticatedPage/>
          }
        ]
      },
      {
        path: '/authorize',
        element: <Authorize/>
      }
    ]
  }
])

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        h1 {
          color: grey;
        }
      `
    }
  }
})

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <LocalStorageProvider>
        <AuthProvider>
          <CssBaseline />
          <RouterProvider router={router} />
        </AuthProvider>
      </LocalStorageProvider>
    </ThemeProvider>
  </React.StrictMode>
)
