import React, { Component } from 'react';
import '../css/App.css';
import { Link } from 'react-router-dom'
import Footer from './Footer'

class CreateFamily extends Component {
  constructor() {
    super();
    // Initial state
    this.state = {
      routeAddress: "/",
    };
    this.createFamily = this.createFamily.bind(this);
    this.keyEvent = this.keyEvent.bind(this);
  }

  createFamily(e) {
    const family_name = document.getElementById("family_name").value;
    const pin = document.getElementById("pin").value;
    if (family_name === "" || pin === "") {
      alert("Please fill in all required information!");
    }
    else {
      localStorage.setItem('family_name', family_name);
      localStorage.setItem('pin', pin);
      window.location="#/";
    }
  }

  keyEvent (e) {
    if (e.key === 'Enter') {
      this.createFamily();
    }
  }

  render() {
    return (
      <div onKeyPress={this.keyEvent}>
        <h1 className="welcome-msg">Create your family account!</h1>
        <div className="container">
          <div className="login-bar">
            <div className="header">
              <h2>Create family account</h2>
            </div>
            <form method="post">
              <div className="input-group">
                <label>Family name*</label>
                <input type="text" name="family_name" id="family_name" ></input>
              </div>

              <div className="input-group">
                <label>PIN*</label>
                <input type="password" name="pin" id="pin" ></input>
              </div>

              <div>
                <input type="button" className="btn" id="submitBtn" name="login_btn"  onClick={this.createFamily} value="Create"/>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default CreateFamily;
