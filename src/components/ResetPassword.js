import React from 'react';
import {Link} from 'react-router-dom';
import Footer from './Footer'
import bg from '../img/background35.jpg';

const background = {
  backgroundImage: `url(${bg})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
}

class ResetPassword extends React.Component{
  constructor() {
    super();

    // Initial state
    this.state = {
    };
    // Bind all functions so they can refer to "this" correctly
    this.sendEmail = this.sendEmail.bind(this);
    this.keyEvent = this.keyEvent.bind (this);
  }

  sendEmail(e){
    const email = document.getElementById("email").value;
    if(!email.includes("@")||!email.includes(".com")){
      alert("Please enter a valid email address!");
    }
    else{
      alert("A password reset link has been sent to " + email);
      window.location="#/login";
    }
  }

  keyEvent (e) {
    if (e.key === 'Enter') {
      this.sendEmail();
    }
  }

  render(){
    return (
      <div style={background}>
        <div className="container" onKeyPress={this.keyEvent}>
          <div className="login-bar" style={{marginTop:250+'px'}}>
            <div className="header">
              <h2>Reset Your Password</h2>
            </div>
            <form id="form_id" method="post" name="myform">
              <div className="input-group">
                <label>Your Email</label>
                <input type="email" id="email" placeholder="name@example.com"></input>
              </div>
              <div>
                <Link to="/login" className="btn" style={{marginLeft:5+'px'}}>Back</Link>
                <input className="btn" name="password_btn" onClick={this.sendEmail} style={{width:150+'px', marginLeft:190+'px'}} value="Forget Password" readOnly/>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ResetPassword;
