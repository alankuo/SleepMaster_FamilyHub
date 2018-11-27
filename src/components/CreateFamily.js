import React, { Component } from 'react';
import '../css/App.css';
import '../css/cropper.css';
import { Link } from 'react-router-dom'
import Footer from './Footer'
import Cropper from 'react-cropper';
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
      imageURL: "",
      cropResult: ''
    };
    this.createFamily = this.createFamily.bind(this);
    this.keyEvent = this.keyEvent.bind(this);
    this.setImageURL = this.setImageURL.bind(this);
    this.cropImage = this.cropImage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.openAlert = this.openAlert.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
  }

  createFamily(e) {
    const family_name = document.getElementById("family_name").value;
    const pin = document.getElementById("pin").value;
    if (family_name === "" || pin === "") {
      this.setState({
        show: true,
        msg: "Please fill in all required information!",
        type: "warning"
      });
      setTimeout((this.closeAlert), 2000);
    }
    else if(this.state.imageURL === "") {
      this.setState({
        show: true,
        msg: "Please select a photo for your family!",
        type: "warning"
      });
      setTimeout((this.closeAlert), 2000);
    }
    else if(this.state.cropResult === "") {
      this.setState({
        show: true,
        msg: "Please crop your family photo to the desired dimension!",
        type: "warning"
      });
      setTimeout((this.closeAlert), 2000);
    }
    else {
      localStorage.setItem('family_name', family_name);
      localStorage.setItem('pin', pin);
      localStorage.setItem('firstTime', false);
      localStorage.setItem('familyPhoto', this.state.cropResult);
      this.setState({
        show: true,
        msg: "Your Family Group is Created! Enjoy!!",
        type: "success"
      });
      setTimeout((this.closeAlert), 2000);
      // alert ("The account for " + username + " has been successfully created! You can log in to FamilyHub Now!");
      setTimeout(() => {window.location = "#/"}, 2000);
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

  onChange(e) {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ imageURL: reader.result });
    };
    reader.readAsDataURL(files[0]);
  }

  cropImage(e) {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.setState({
      cropResult: this.cropper.getCroppedCanvas().toDataURL(),
    });
    e.preventDefault();
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
    return (
      <div style={background}>
        <div className="container">
          <div className="login-bar">
            <div className="header">
              <h2>Create Your Family Account</h2>
            </div>
            {this.state.show && this.openAlert()}
            <form>
              <div className="input-group" onKeyPress={this.keyEvent}>
                <label>Family Name*</label>
                <input type="text" name="family_name" id="family_name" ></input>
              </div>

              <div className="input-group" onKeyPress={this.keyEvent}>
                <label>Family PIN*</label>
                <input type="password" name="pin" id="pin" ></input>
              </div>
              <div className="input-group">
                <label>Upload a Family Photo*</label>
                <input type="file" onChange={this.onChange} />
                {this.state.imageURL!==""?
                  <div>
                  <Cropper
                    style={{ height: 400, width: '400px' }}
                    aspectRatio={16 / 9}
                    preview=".img-preview"
                    guides={false}
                    src={this.state.imageURL}
                    ref={cropper => { this.cropper = cropper; }}
                  /><button onClick={this.cropImage} style={{ float:'right', marginTop:10, fontWeight:"bold" }}>
                    Crop Image
                  </button>
                  </div>
                  :''
                }
                <img style={{ width: '100%' }} src={this.state.cropResult} alt={this.state.cropResult} />
              </div>

              <div>
                <input type="button" className="btn" id="submitBtn"  onClick={this.createFamily} value="Create"/>
                <p style={{fontSize:18+'px'}}>
                  Know Your Family Account? <br />
                  <Link to="/join-family">Join Your Family</Link>
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
