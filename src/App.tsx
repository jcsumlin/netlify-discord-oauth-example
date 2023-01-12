import React from 'react'
import logo from './assets/logo.svg'
import './App.css'
import { doLogin } from './utils/api'
import { Button } from '@mui/material'

function App (): JSX.Element {
  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Button onClick={() => doLogin()}>Login</Button>
        </header>
      </div>
  )
}

export default App
