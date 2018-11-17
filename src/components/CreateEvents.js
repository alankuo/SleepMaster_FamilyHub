import React, { Component } from 'react';
import NavBar from './NavBar.js';

import UploadImage from'./UploadImage';
import Footer from './Footer'

class CreateEvents extends Component {
  constructor() {
    super();
    // Initial state
    this.state = {
      routeAddress: "/",
      imageURL: ""
    };

    // Bind all functions so they can refer to "this" correctly
    this.createEvent = this.createEvent.bind(this);
    this.keyEvent = this.keyEvent.bind(this);
    this.setImageURL = this.setImageURL.bind(this);
    this.storeEvent = this.storeEvent.bind(this);
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
      alert("Please fill in the event name!");
    }
    else if(numOfMembers === ""){
      alert("Please fill in the number of members suggested!");
    }
    else if(categoryId === "0") {
      alert("Please select a category for the event!");
    }
    else if(this.state.imageURL === "") {
      alert("Please select an image for the event!");
    }
    else{
      alert ("The event has been successfully created!");
      this.storeEvent(eventName, numOfMembers, categoryText, equipment, time, description);
      window.location = "#/";
    }
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
            <form method="post">
              <div className="input-group" onKeyPress={this.keyEvent}>
                <label>Event Name*</label>
                <input type="text" name="event_name" id="event_name" placeholder=""></input>
              </div>
              <div className="input-group" onKeyPress={this.keyEvent}>
                <label>Number of members*</label>
                <input type="number" name="number_of_members" id="number_of_members" placeholder=""></input>
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
                <input type="number" name="time" id="time" placeholder=""></input>
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
