import React, { Component } from 'react';
import '../css/App.css';
import { Link } from 'react-router-dom'

class Login extends Component {
  render() {
    return (
      <div className="App">
        <div style={{padding:300+"px", fontSize:30}}>
          <p style={{fontSize:40}}>Let's Log In!!!!!</p><br/>
          <Link to="/">Log In</Link>
        </div>
      </div>
    );
  }
}

export default Login;
