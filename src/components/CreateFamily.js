import React, { Component } from 'react';
import '../css/App.css';
import '../css/cropper.css';
import { Link } from 'react-router-dom'
import Footer from './Footer'
import Cropper from 'react-cropper';

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
    else if(this.state.cropResult === "") {
      alert("Please crop your family photo to the desired dimension!");
    }
    else {
      localStorage.setItem('family_name', family_name);
      localStorage.setItem('pin', pin);
      localStorage.setItem('firstTime', false);
      localStorage.setItem('familyPhoto', this.state.cropResult);
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
