import React, { Component } from 'react';
import '../css/App.css';
import { Link } from 'react-router-dom'
import Footer from './Footer'
import bg from '../img/background35.jpg';
import AlertBox from "./AlertBox.js";

const background = {
  background: `url(${bg}) no-repeat center center fixed`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
}

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
    this.openAlert = this.openAlert.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
  }

  validateJoin(e){
    const family_name = document.getElementById("family_name").value;
    const pin = document.getElementById("pin").value;
    if ((family_name === localStorage['family_name'] && pin === localStorage['pin'])){
      localStorage.setItem('firstTime', false);
      this.setState({
        show: true,
        msg: "Welcome to the Family!",
        type: "success"
      });
      setTimeout((this.closeAlert),1500);
      // alert ("The account for " + username + " has been successfully created! You can log in to FamilyHub Now!");
      setTimeout(() => {window.location = "#/"}, 1500);
    }
    else{
      this.setState({
        show: true,
        msg: "Family Name and PIN do not match!",
        type: "warning"
      });
      setTimeout((this.closeAlert), 2000);
    }
  }

  keyEvent (e) {
    if (e.key === 'Enter') {
      this.validateJoin();
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
    document.title = 'Login - FamilyHub';
    return (
      <div onKeyPress={this.keyEvent} style={background}>
        <div className="container" style={{paddingBottom: "70px"}}>
          <div className="login-bar" style={{marginTop: '10%', marginBottom: '6%'}}>
            <div className="header">
              <h2>Enter Family Account Info</h2>
            </div>
            {this.state.show && this.openAlert()}
            <form id="form_id" method="post" name="myform">
              <div className="input-group">
                <label>Family Name*</label>
                <input type="text" name="family_name" id="family_name" ></input>
              </div>

              <div className="input-group">
                <label>Family Password*</label>
                <input type="password" name="pin" id="pin" ></input>
              </div>

              <div>
                <input type="button" className="btn" onClick={this.validateJoin} id="submitBtn" name="login_btn" value="Join"/>
                <p style={{fontSize:18+'px'}}>
                  Need to Create a New Family Group? <br />
                  <Link to="/create-family">Create Group for Your Family </Link>
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