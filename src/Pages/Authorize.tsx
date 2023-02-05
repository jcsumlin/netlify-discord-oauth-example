import React, { FunctionComponent, useEffect } from 'react'
import { getUser } from '../utils/api'
import { useAuth } from '@reactivers/hooks'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loading from '../Components/Loading'

const Authorize: FunctionComponent = () => {
  const {
    login,
    user,
    isLoggedIn
  } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    void getUser()
      .then(({ data }) => {
        const userInfo = {
          username: data.user.username,
          token: data.token,
          userInfo: data.user
        }
        login(userInfo)
      }).catch(() => {
        toast.error('You are not authorized, please login')
      })
  }, [])

  useEffect(() => {
    if (user != null && isLoggedIn) {
      navigate('/dashboard', { replace: true })
    }
  }, [isLoggedIn, user])

  return (
    <Loading message={'Authorizing...'}/>
  )
}

export default Authorize
