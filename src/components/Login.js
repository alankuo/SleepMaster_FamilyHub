import React, { Component } from 'react';
import '../css/App.css';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import bg from '../img/background35.jpg';
import logo from "../img/logo.png";
import AlertBox from "./AlertBox.js";

const background = {
  backgroundImage: `url(${bg})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
}

const msg = "username and password do not match!";

class Login extends Component {
  constructor() {
    super();
    // Initial state
    this.state = {
      routeAddress: "/",
      show: false,
    };
    // Bind all functions so they can refer to "this" correctly
    this.validateLogin = this.validateLogin.bind(this);
    this.keyEvent = this.keyEvent.bind (this);
    this.openAlert = this.openAlert.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
  }

  validateLogin(e){
    const email_username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if ( (email_username === "philip"  && password === "guo") ||
          ((email_username === localStorage['username'] || email_username === localStorage['email'])
          && password === localStorage['password'])){
            if(localStorage['firstTime'] === undefined) {
              localStorage.setItem('firstTime', true);
            }
            let firstID = localStorage['firstTime'];
            if(firstID === "true") {
              window.location = "#/create";
            }
            else {
              window.location="#/";
            }
    }
    else{
      this.setState({show: true});
      setTimeout((this.closeAlert), 2000);
      // alert("username and password do not match!");
    }
  }

  keyEvent (e) {
    if (e.key === 'Enter') {
      this.validateLogin();
    }
  }

  openAlert(msg) {
    return <AlertBox alertMsg={msg} close={this.closeAlert} />;
  }

  closeAlert() {
    this.setState({show: false});
  }

  render() {
    document.title = 'Login - FamilyHub';
    return (
      <div onKeyPress={this.keyEvent} style={background}>
        {/**<h1 className="welcome-msg">Welcome to <span className="primary">FamilyHub!!</span></h1>**/}
        <div className="container">
          <div className="login-bar">
            <div className="header">
              <img src={logo} alt="" className="logo"/>
            </div>
            {this.state.show && this.openAlert("username and password do not match!")}
            <form id="form_id" method="post" name="myform">

              <div className="input-group">
                <label>Email/Username</label>
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
        <Footer />
      </div>
    );
  }
}

export default Login;
