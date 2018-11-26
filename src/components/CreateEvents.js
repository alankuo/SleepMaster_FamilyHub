import React, { Component } from 'react';
import NavBar from './NavBar.js';

import UploadImage from'./UploadImage';
import Footer from './Footer';
import AlertBox from "./AlertBox.js";

class CreateEvents extends Component {
  constructor() {
    super();
    // Initial state
    this.state = {
      routeAddress: "/",
      imageURL: "",
      show: false,
      msg: "",
      type: "",
    };

    // Bind all functions so they can refer to "this" correctly
    this.createEvent = this.createEvent.bind(this);
    this.keyEvent = this.keyEvent.bind(this);
    this.setImageURL = this.setImageURL.bind(this);
    this.storeEvent = this.storeEvent.bind(this);
    this.openAlert = this.openAlert.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
  }

  createEvent(e){
    const eventName = document.getElementById("event_name").value;
    const numOfMembers = document.getElementById("number_of_members").value;
    const time = document.getElementById("time").value;
    const categorySelecter = document.getElementById("categorySelector");
    const categoryId = categorySelecter.options[categorySelecter.selectedIndex].value;
    const categoryText = categorySelecter.options[categorySelecter.selectedIndex].text;
    const description = document.getElementById("description").value;

    // format equipment
    let equipment = document.getElementById("equipment").value;
    equipment = equipment.trim().split(",");
    if(equipment.length == 0) {
      equipment.push("N/A")
    }


    if(eventName === ""){
      this.setState({
        show: true,
        msg: "The event has been successfully created and added to explore page!",
        type: "success_info"
      });
      // this.setState({
      //   show: true,
      //   msg: "Please fill in the event name!",
      //   type: ""
      // });
      // setTimeout((this.closeAlert), 2000);
    }
    else if(numOfMembers === ""){
      this.setState({
        show: true,
        msg: "Please fill in the number of members suggested!",
        type: ""
      });
      setTimeout((this.closeAlert), 2000);
    }

    else if(categoryId === "0") {
      this.setState({
        show: true,
        msg: "Please select a category for the event!",
        type: ""
      });
      setTimeout((this.closeAlert), 2000);
    }
    else if(this.state.imageURL === "") {
      this.setState({
        show: true,
        msg: "Please select an image for the event!",
        type: ""
      });
      setTimeout((this.closeAlert), 2000);
    }
    else if(numOfMembers < "0" || time < "0") {
      this.setState({
        show: true,
        msg: "Please enter a valid number!",
        type: ""
      });
      setTimeout((this.closeAlert), 2000);
    }
    else{
      this.setState({
        show: true,
        msg: "The event has been successfully created and added to explore page!",
        type: "success_info"
      });
      this.storeEvent(eventName, numOfMembers, categoryText, equipment, time, description);
      // window.location = "#/";
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

  keyEvent(e) {
    if (e.key === 'Enter') {
      this.createEvent();
    }
  }

  setImageURL(url) {
    this.setState({imageURL: url});
  }

  storeEvent(eventName, numOfMembers, categoryText, equipment, time, description) {
    let activityArray = localStorage["activities"];
    if(activityArray === undefined) {
      activityArray = [];
    }
    else {
      activityArray = JSON.parse(activityArray);
    }
    let eventObj = {
      "name": eventName,
      "num": [0,numOfMembers],
      "category":categoryText,
      "equipment":equipment,
      "time-length":time,
      "img":this.state.imageURL,
      "description":description
    };
    activityArray.push(eventObj);
    localStorage.setItem('activities', JSON.stringify(activityArray));
  }

  render() {
    document.title = 'Create an Event';
    return (
      <div>
        <NavBar/>
        <div className="container">
          <div className="settings-bar">
            <div className="header">
              <h2>Create an Event</h2>
            </div>
            {this.state.show && this.openAlert()}
            <form method="post">
              <div className="input-group" onKeyPress={this.keyEvent}>
                <label>Event Name*</label>
                <input type="text" name="event_name" id="event_name" placeholder=""></input>
              </div>
              <div className="input-group" onKeyPress={this.keyEvent}>
                <label>Number of members*</label>
                <input type="number" name="number_of_members" min="0" id="number_of_members" placeholder=""></input>
              </div>

              <div className="input-group" onKeyPress={this.keyEvent}>
                <label>Category*</label>

                <select className="custom-select" id="categorySelector">
                  <option value="0" defaultValue>Choose Category</option>
                  <option value="1">Outdoor</option>
                  <option value="2">Indoor</option>
                  <option value="3">Others</option>
                </select>
              </div>

              <div className="input-group" onKeyPress={this.keyEvent}>
                <label>Approximated Time (in minutes)</label>
                <input type="number" name="time" min="0" id="time" placeholder=""></input>
              </div>

              <div className="input-group" onKeyPress={this.keyEvent}>
                <label>Equipment Needed</label>
                <input type="text" name="equipment" id="equipment" placeholder=""></input>
              </div>

              <div className="input-group">
                <label>Description</label>
                <textarea style={{height:100+'px',width:400+'px'}} type="text" name="description" id="description" placeholder="Please enter the description for the event..."></textarea>
              </div>

              <div className="input-group" onKeyPress={this.keyEvent}>
                <label>Event Photo*</label>
                <UploadImage setImageURL={this.setImageURL} showPreview={true}/>
              </div>

              <div>
                <input type="button" className="btn" onClick={this.createEvent} id="submitBtn" name="create_btn" value="CREATE"/>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default CreateEvents;
