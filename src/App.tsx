import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="http://localhost:8888/.netlify/functions/login"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Login
                </a>
                <a href={"http://localhost:8888/.netlify/functions/me"}>Get User</a>
                <a href={"http://localhost:8888/.netlify/functions/logout"}>Logout</a>
                <a href={"http://localhost:8888/.netlify/functions/refresh"}>Refresh</a>
            </header>
        </div>
    );
}

export default App;
