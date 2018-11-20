import React, { Component } from 'react';
import '../css/App.css';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import bg from '../img/background45.jpg';

const background = {
  background: `url(${bg}) no-repeat center center fixed`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
}

class Register extends Component {
  constructor() {
    super();
    // Initial state
    this.state = {
      routeAddress: "/login"
    };

    // Bind all functions so they can refer to "this" correctly
    this.registerAccount = this.registerAccount.bind(this);
    this.keyEvent = this.keyEvent.bind (this);
  }

  registerAccount(e){
    const first_name = document.getElementById("first_name").value;
    const last_name = document.getElementById("last_name").value;
    const username = document.getElementById("username").value;
    const password_1 = document.getElementById("password_1").value;
    const password_2 = document.getElementById("password_2").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    if(first_name===""||last_name===""||username===""||password_1===""||email===""){
      alert("Please fill in all required information!");
    }
    else if(password_1.length<8){
      alert("Password is too short! It has to be at least 8 characters!");
    }
    else if(password_1!==password_2){
      alert("Passwords do not match!");
    }
    else if(!email.includes("@")||!email.includes(".com")){
      alert("Please enter a valid email address!");
    }
    else{
      localStorage.setItem('username', username);
      localStorage.setItem('password', password_1);
      localStorage.setItem('email', email);
      localStorage.setItem('phone', phone);
      localStorage.setItem('firstTime', true);
      alert ("The account for " + username + " has been successfully created! You can log in to FamilyHub Now!");
      window.location = "#/login";
    }
  }

  keyEvent (e) {
    if (e.key === 'Enter') {
      this.registerAccount();
    }
  }

  render() {
    document.title = 'Register - FamilyHub';
    return (
      <div style={background}>
      <div className="container" onKeyPress={this.keyEvent}>
        <div className="login-bar">
          <div className="header">
            <h2>Register An Account</h2>
          </div>
          <form method="post">
            <div className="input-group">
              <label>First Name*</label>
              <input type="text" name="first_name" id="first_name" placeholder=""></input>
            </div>
            <div className="input-group">
              <label>Last Name*</label>
              <input type="text" name="last_name" id="last_name" placeholder=""></input>
            </div>
            <div className="input-group">
              <label>Username*</label>
              <input type="text" name="username" id="username" placeholder=""></input>
            </div>
            <div className="input-group">
              <label>Password*</label>
              <input type="password" name="password_1" id="password_1" placeholder="xxxxxxxx"></input>
            </div>
            <div className="input-group">
              <label>Confirm Password*</label>
              <input type="password" name="password_2" id="password_2" placeholder="xxxxxxxx"></input>
            </div>
            <div className="input-group">
              <label>Phone</label>
              <input type="number" name="phone" id="phone" placeholder="(000)-000-0000"></input>
            </div>
            <div className="input-group">
              <label>Email*</label>
              <input type="email" name="email" id="email" placeholder="name@example.com"></input>
            </div>
            <p>By submitting this information, you indicate that you agree to FamilyHub's <strong>Terms of Service</strong> and have read and understood our <strong>Privacy Policy</strong>.</p>
            <input type="button" className="btn" name="register_btn" onClick={this.registerAccount} value="Register" />
            <p>
              Already a Member? <Link to="/login">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
    );
  }
}

export default Register;
