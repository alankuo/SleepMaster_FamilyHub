import React, { Component } from 'react';
import '../css/App.css';
import { Link } from 'react-router-dom'

class Login extends Component {
  constructor() {
    super();
    // Initial state
    this.state = {
      routeAddress: "/"
    };
    // Bind all functions so they can refer to "this" correctly
    this.validateLogin = this.validateLogin.bind(this);
    this.keyEvent = this.keyEvent.bind (this);
  }

  validateLogin(e){
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if ( username === "philip" && password === "guo"){
      window.location="#/";
    }
    else{
      alert("username and password do not match!");
    }
  }

  keyEvent (e) {
    if (e.key === 'Enter') {
      this.validateLogin();
    }
  }

  render() {
    document.title = 'Login - FamilyHub';
    return (
      <div onKeyPress={this.keyEvent}>
        <h1 className="welcome-msg">Welcome to <span className="primary">FamilyHub!!</span></h1>
        <div className="container">
          <div className="login-bar">
            <div className="header">
              <h2>LOG IN</h2>
            </div>
            <form id="form_id" method="post" name="myform">

              <div className="input-group">
                <label>Username</label>
                <input type="text" name="username" id="username" ></input>
              </div>

              <div className="input-group">
                <label>Password</label>
                <input type="password" name="password" id="password" ></input>
              </div>

              <div>
                <input type="button" className="btn" onClick={this.validateLogin} id="submitBtn" name="login_btn" value="LOG IN"/>
              </div>
              <p>
                Not yet a member? <Link to="/register">Sign up</Link>
              </p>
              <p>
                Forgot your password? <Link to="/reset-password">Reset Password</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
