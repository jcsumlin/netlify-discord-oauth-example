import React, { FunctionComponent, useEffect } from 'react'
import { useAuth } from '@reactivers/hooks'
import { Outlet } from 'react-router-dom'
import { doLogout, getLogin, getUser } from '../utils/api'
import Login from './Login'
import Loading from './Loading'

const PrivateRoute: FunctionComponent = () => {
  const { token, isLoggedIn, login, logout } = useAuth()

  useEffect(() => {
    if (token !== 'undefined') {
      if (isLoggedIn) {
        // show application
      } else {
        // get user info
        getUser()
          .then(({ data }) => {
            const userInfo = {
              username: data.user.username,
              userInfo: data.user
            }
            login(userInfo)
          }).catch(console.error)
      }
    } else {
      if (isLoggedIn) {
        // old session -> logout
        doLogout()
        logout()
      } else {
        getLogin()
          .then(({ data }) => {
            window.location.href = data.url
          })
          .catch(console.error)
      }
    }
  }, [token, isLoggedIn, login, logout])

  if (token !== 'undefined') {
    if (isLoggedIn) {
      return <Outlet />
    } else {
      return <Loading/>
    }
  } else {
    if (isLoggedIn) {
      return <p>Logging out...</p>
    } else {
      return <Login />
    }
  }
}

export default PrivateRoute
