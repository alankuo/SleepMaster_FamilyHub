import React, { Component } from 'react';
import '../css/App.css';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import bg from '../img/background35.jpg';
import AlertBox from "./AlertBox.js";

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
      routeAddress: "/login",
      show: false,
      msg: "",
      type: "",
    };

    // Bind all functions so they can refer to "this" correctly
    this.registerAccount = this.registerAccount.bind(this);
    this.keyEvent = this.keyEvent.bind (this);
    this.openAlert = this.openAlert.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
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
      this.setState({
        show: true,
        msg: "Please fill in all required information!",
        type: ""
      });
      setTimeout((this.closeAlert), 2000);
      // alert("Please fill in all required information!");
    }
    else if(password_1.length<8){
      this.setState({
        show: true,
        msg: "Password is too short! It has to be at least 8 characters!",
        type: "warning"
      });
      setTimeout((this.closeAlert), 2000);
      // alert("Password is too short! It has to be at least 8 characters!");
    }
    else if(password_1!==password_2){
      this.setState({
        show: true,
        msg: "Passwords do not match!",
        type: "warning"
      });
      setTimeout((this.closeAlert), 2000);
      // alert("Passwords do not match!");
    }
    else if(!email.includes("@")||(!email.includes("com") && !email.includes("edu") && !email.includes("org"))){
      this.setState({
        show: true,
        msg: "Please enter a valid email address!",
        type: "warning"
      });
      setTimeout((this.closeAlert), 2000);
      // alert("Please enter a valid email address!");
    }
    else{
      localStorage.setItem('username', username);
      localStorage.setItem('password', password_1);
      localStorage.setItem('email', email);
      localStorage.setItem('phone', phone);
      localStorage.setItem('firstTime', true);
      this.setState({
        show: true,
        msg: "Your account has been successfully created! You can log in to FamilyHub now!",
        type: "success"
      });
      setTimeout((this.closeAlert), 2000);
      // alert ("The account for " + username + " has been successfully created! You can log in to FamilyHub Now!");
      setTimeout(() => {window.location = "#/login"}, 2000);
    }
  }

  keyEvent (e) {
    if (e.key === 'Enter') {
      this.registerAccount();
    }
  }

  openAlert() {
    return <AlertBox
              alertMsg={this.state.msg}
              close={this.closeAlert}
              type={this.state.type} />;
  }

  closeAlert() {
    this.setState({show: false});
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
          {this.state.show && this.openAlert()}
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
