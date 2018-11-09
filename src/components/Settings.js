import React, { Component } from 'react';
import '../css/App.css';
import NavBar from './NavBar'
import Footer from './Footer'

class Settings extends Component {
  constructor() {
    super();

    // Initial state
    this.state = {
      routeAddress: "/profile"
    };

    // Bind all functions so they can refer to "this" correctly
    this.saveProfile = this.saveProfile.bind(this);
  }
  componentDidMount() {
    if (localStorage["username"] === undefined) {
      document.getElementsByName("username")[0].value = "";
      document.getElementsByName("phone")[0].value = "";
      document.getElementsByName("email")[0].value = "";
    } else {
      document.getElementsByName("username")[0].value = localStorage["username"];
      document.getElementsByName("phone")[0].value = localStorage["phone"];
      document.getElementsByName("email")[0].value = localStorage["email"];
    }
  }
  saveProfile(e){
    localStorage.setItem("username",document.getElementsByName("username")[0].value);
    localStorage.setItem("phone",document.getElementsByName("phone")[0].value);
    localStorage.setItem("email",document.getElementsByName("email")[0].value);
    alert("Profile has been saved!");
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="settings-bar">
            <div className="header">
              <h2>Edit Your Profile</h2>
            </div>
            <form>
              <div className="input-group">
                <label>Username</label>
                <input type="text" name="username" defaultValue="johndoe"/>
              </div>
              <div className="input-group">
                 <label>Phone</label>
                 <input type="text" name="phone" defaultValue="(123)456-7890"/>
               </div>
               <div className="input-group">
                 <label>Email</label>
                 <input type="email" name="email" defaultValue="johndoe@example.com"/>
               </div>
               <p>By submitting this information, you indicate that you agree to EasyLineUp's <strong>Terms of Service</strong> and have read and understood our <strong>Privacy Policy</strong>.</p>
               <div className="input-group">
                <input type="submit" onClick={this.saveProfile} className="btn" name="register_btn" value="Save" />
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Settings;
