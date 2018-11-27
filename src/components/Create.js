import React, { Component } from 'react';
import '../css/Create.css';
import NavBar from './NavBar';
import { Link } from 'react-router-dom'
import bg from '../img/background45.jpg';
import Cropper from 'react-cropper';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
// import CreateFamily from './CreateFamily'
// import JoinFamily from './JoinFamily'
import Footer from './Footer'

const background = {
  background: `url(${bg}) no-repeat center center fixed`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
}


class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      create: false,
      join: true,
      routeAddress: "/",
      imageURL: "",
      cropResult: '',
    };
    this.create = this.create.bind(this);
    this.join = this.join.bind(this);
    this.createFamily = this.createFamily.bind(this);
    this.keyEvent = this.keyEvent.bind(this);
    this.setImageURL = this.setImageURL.bind(this);
    this.cropImage = this.cropImage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.validateJoin = this.validateJoin.bind(this);
    // this.keyEvent = this.keyEvent.bind (this);


  }
  //create a family
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


  //join a family
  validateJoin(e){
    const family_name = document.getElementById("family_name").value;
    const pin = document.getElementById("pin").value;
    if ((family_name === localStorage['family_name'] && pin === localStorage['pin'])){
      localStorage.setItem('firstTime', false);
      alert("Welcome to the Family!");
      window.location="#/";
    }
    else{
      alert("Family Name and PIN do not match!");
    }
  }

  //key event

  keyEvent (e) {
    const join = this.state.join;
    if (e.key === 'Enter' && !join) {
      this.createFamily();
    }
    else if (e.key === 'Enter' && join){
      this.validateJoin();
    }
  }

  //status
  create() {
    this.setState({create: true});
    this.setState({join: false});
  }

  join() {
    this.setState({create: false});
    this.setState({join: true});
  }


  render() {
    const join = this.state.join;
    let returnDiv;

    if (join){
      returnDiv =
        <div onKeyPress={this.keyEvent} >

          <div className="container" style={{paddingBottom: "50px"}}>
            <div className="login-bar" style={{ marginBottom: '6%'}}>
              <div className="family-header">
                <Nav bsStyle="tabs" justified activeKey={1} style={{backgroundColor: 'transparent'}}>
                  <NavItem eventKey={1} className="family-tab" href="#" onClick={this.join} active={true}>
                    <h3>Join Existing Family</h3>
                  </NavItem>
                  <NavItem eventKey={2} className="family-tab" href="#" onClick={this.create}>
                    <h3 style={{color:'#FFFFFF'}}>Create Your Family Account</h3>
                  </NavItem>
                </Nav>
              </div>


              <form id="form_id" method="post" name="myform">
                <div className="input-group">
                  <label>Family Name*</label>
                  <input type="text" name="family_name" id="family_name" />
                </div>

                <div className="input-group">
                  <label>Family PIN*</label>
                  <input type="password" name="pin" id="pin" />
                </div>

                <div>
                  <input type="button" className="btn" onClick={this.validateJoin} id="submitBtn" name="login_btn" value="Join"/>
                </div>
              </form>
            </div>
          </div>
          <Footer />
        </div>
    }
    else{
      returnDiv =
        <div onKeyPress={this.keyEvent} >
          <div className="container" style={{paddingBottom: "50px"}}>
            <div className="login-bar" style={{marginBottom: '6%'}}>
              <div className="family-header">
                {/*<Navbar inverse collapseOnSelect style={{backgroundColor: 'transparent', border:'none'}}>*/}
                <Nav bsStyle="tabs" justified activeKey={2} style={{backgroundColor: 'transparent'}}>
                  <NavItem eventKey={1} className="family-tab" href="#" onClick={this.join} >
                    <h3 style={{color:'#FFFFFF'}}>Join Existing Family</h3>
                  </NavItem>
                  <NavItem eventKey={2} className="family-tab" href="#" onClick={this.create}>
                    <h3>Create Your Family Account</h3>
                  </NavItem>
                </Nav>
              </div>


              <form id="form_id" method="post" name="myform">
                <div className="input-group" onKeyPress={this.keyEvent}>
                  <label>Family Name*</label>
                  <input type="text" name="family_name" id="family_name" />
                </div>

                <div className="input-group" onKeyPress={this.keyEvent}>
                  <label>Family PIN*</label>
                  <input type="password" name="pin" id="pin" />
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
                </div>
              </form>
            </div>
          </div>
          <Footer />
        </div>

    }


    return (
      <div style={background}>
           {returnDiv}
      </div>
    );
  }
}

export default Create;
