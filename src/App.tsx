import React, { useEffect, useState } from 'react'
import logo from './assets/logo.svg'
import './App.css'
import axios from 'axios'

function App (): JSX.Element {
  const [user, setUser] = useState({})
  useEffect(() => {
    axios.get('/.netlify/functions/me')
      .then((res) => {
        setUser(res.data)
      }).catch(e => {
        console.log(e)
      })
  }, [])
  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <pre>
          {JSON.stringify(user, null, 2)}
        </pre>
          <a
            className="App-link"
            href="http://localhost:8888/.netlify/functions/login"
          >
            Login
          </a>
          <a className="App-link" href={'http://localhost:8888/.netlify/functions/me'}>Get User</a>
          <a className="App-link" href={'http://localhost:8888/.netlify/functions/logout'}>Logout</a>
          <a className="App-link" href={'http://localhost:8888/.netlify/functions/refresh'}>Refresh</a>
        </header>
      </div>
  )
}

export default App
