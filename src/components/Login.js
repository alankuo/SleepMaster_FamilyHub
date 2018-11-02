import React, { Component } from 'react';
import '../css/App.css';
import { Link } from 'react-router-dom'

class Login extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <p>
            Let's Login!!
          </p>
          <Link to="/">Log In</Link>
        </header>
      </div>
    );
  }
}

export default Login;
