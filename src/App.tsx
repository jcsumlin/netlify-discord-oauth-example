import React from 'react'
import logo from './assets/logo.svg'
import './App.css'

function App (): JSX.Element {
  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <a
            className="App-link"
            href="/.netlify/functions/login"
          >
            Login
          </a>
        </header>
      </div>
  )
}

export default App
