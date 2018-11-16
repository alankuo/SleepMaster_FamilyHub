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
    // Bind all functions so they can refer to "this" correctly
    this.validateJoin = this.validateJoin.bind(this);
    this.keyEvent = this.keyEvent.bind (this);
  }

  validateJoin(e){
    const family_name = document.getElementById("family_name").value;
    const pin = document.getElementById("pin").value;
    if ((family_name === localStorage['family_name'] && pin === localStorage['pin'])){
      window.location="#/";
    }
    else{
      alert("family name and pin do not match!");
    }
  }

  keyEvent (e) {
    if (e.key === 'Enter') {
      this.validateJoin();
    }
  }

  render() {
    document.title = 'Login - FamilyHub';
    return (
      <div onKeyPress={this.keyEvent}>
        <h1 className="welcome-msg">Join your family now!</h1>
        <div className="container">
          <div className="login-bar">
            <div className="header">
              <h2>Enter family account info</h2>
            </div>
            <form id="form_id" method="post" name="myform">

              <div className="input-group">
                <label>Family name</label>
                <input type="text" name="family_name" id="family_name" ></input>
              </div>

              <div className="input-group">
                <label>PIN</label>
                <input type="password" name="pin" id="pin" ></input>
              </div>

              <div>
                <input type="button" className="btn" onClick={this.validateJoin} id="submitBtn" name="login_btn" value="Join"/>
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
