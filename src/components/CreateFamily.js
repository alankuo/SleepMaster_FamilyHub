import React, { Component } from 'react';
import '../css/App.css';
import { Link } from 'react-router-dom'
import Footer from './Footer'
import UploadImage from './UploadImage'

class CreateFamily extends Component {
  constructor() {
    super();
    // Initial state
    this.state = {
      routeAddress: "/",
      imageURL: ""
    };
    this.createFamily = this.createFamily.bind(this);
    this.keyEvent = this.keyEvent.bind(this);
    this.setImageURL = this.setImageURL.bind(this);
  }

  createFamily(e) {
    const family_name = document.getElementById("family_name").value;
    const pin = document.getElementById("pin").value;
    if (family_name === "" || pin === "") {
      alert("Please fill in all required information!");
    }
    else if(this.state.imageURL === "") {
      alert("Please select a photo for your family!");
    }
    else {
      localStorage.setItem('family_name', family_name);
      localStorage.setItem('pin', pin);
      localStorage.setItem('firstTime', false);
      localStorage.setItem('familyPhoto', this.state.imageURL);
      alert("Your Family Group is Created! Enjoy!!");
      window.location="#/";
    }
  }

  keyEvent (e) {
    if (e.key === 'Enter') {
      this.createFamily();
    }
  }

  setImageURL(url) {
    this.setState({imageURL: url});
  }

  render() {
    return (
      <div>
        <h1 className="welcome-msg">Create your family account!</h1>
        <div className="container">
          <div className="login-bar">
            <div className="header">
              <h2>Create Your Family Account</h2>
            </div>
            <form method="post">
              <div className="input-group" onKeyPress={this.keyEvent}>
                <label>Family Name*</label>
                <input type="text" name="family_name" id="family_name" ></input>
              </div>

              <div className="input-group" onKeyPress={this.keyEvent}>
                <label>PIN*</label>
                <input type="password" name="pin" id="pin" ></input>
              </div>
              <div className="input-group">
                <label>Upload a Family Photo*</label>
                <p style={{float:"left"}}>Recommended Size (16:9)</p>
                <UploadImage setImageURL={this.setImageURL}/>
              </div>

              <div>
                <input type="button" className="btn" id="submitBtn"  onClick={this.createFamily} value="Create"/>
                <p>
                  Know Your Family Account? <Link to="/join-family">Join Your Family</Link>
                </p>
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
