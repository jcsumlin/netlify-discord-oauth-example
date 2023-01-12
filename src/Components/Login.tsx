import React, { FunctionComponent, useEffect } from 'react'
import { doLogin } from '../utils/api'

const Login: FunctionComponent = () => {
  useEffect(() => {
    doLogin()
  }, [])

  return (<>Loading...</>)
}

export default Login
