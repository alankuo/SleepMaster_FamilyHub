import React, { Component } from 'react';
import '../css/App.css';
import '../css/cropper.css';
import NavBar from './NavBar'
import Footer from './Footer'
import Cropper from 'react-cropper'
import AlertBox from "./AlertBox.js";

class Settings extends Component {
  constructor() {
    super();

    // Initial state
    this.state = {
      routeAddress: "/profile",
      newImageURL: "",
      cropResult: ""
    };

    // Bind all functions so they can refer to "this" correctly
    this.saveProfile = this.saveProfile.bind(this);
    this.cropImage = this.cropImage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.openAlert = this.openAlert.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
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
    let email = document.getElementsByName("email")[0].value;
    if(!email.includes("@")||!email.includes(".com")){
      this.setState({
        show: true,
        msg: "Please enter a valid email address!",
        type: "warning"
      });
      setTimeout((this.closeAlert), 2000);
    }
    else {
      if(this.state.cropResult !== "") {
        localStorage.setItem("familyPhoto", this.state.cropResult);
      }
      localStorage.setItem("username", document.getElementsByName("username")[0].value);
      localStorage.setItem("phone", document.getElementsByName("phone")[0].value);
      localStorage.setItem("email", email);
      this.setState({
        show: true,
        msg: "Profile has been saved!",
        type: "success"
      });
      setTimeout((this.closeAlert), 2000);
      // alert ("The account for " + username + " has been successfully created! You can log in to FamilyHub Now!");
      setTimeout(() => {window.location = "#/"}, 2000);
    }
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
      this.setState({ newImageURL: reader.result });
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
      <div className="App">
        <NavBar />
        <div className="container">
          <div className="settings-bar">
            <div className="header">
              <h2>Edit Your Profile</h2>
            </div>
            {this.state.show && this.openAlert()}
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
               <div className="input-group">
                 <label>Change a Family Photo</label>
                 <input type="file" onChange={this.onChange} />
                 {this.state.newImageURL!==""?
                   <div>
                   <Cropper
                     style={{ height: 400, width: '400px' }}
                     aspectRatio={16 / 9}
                     preview=".img-preview"
                     guides={false}
                     src={this.state.newImageURL}
                     ref={cropper => { this.cropper = cropper; }}
                   /><button onClick={this.cropImage} style={{ float:'right', marginTop:10, fontWeight:"bold" }}>
                     Crop Image
                   </button>
                   <p>*Make sure you crop the image so that changes on the photo could apply*</p>
                   </div>
                   :''
                 }
                 <img style={{ width: '100%' }} src={this.state.cropResult} alt={this.state.cropResult} />
               </div>

               <input type="submit" onClick={this.saveProfile} className="btn" value="Save" />
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Settings;
