import React, { Component } from 'react';
import eventPhoto from '../img/bike.jpg'
import NavBar from './NavBar.js';
import {Link} from 'react-router-dom';

import ImageUpload from'./UploadImage';

class CreateEvents extends Component {
  constructor() {
    super();
    // Initial state
    this.state = {
      routeAddress: "/"
    };

    // Bind all functions so they can refer to "this" correctly
    this.createEvent = this.createEvent.bind(this);
    this.keyEvent = this.keyEvent.bind (this);
  }

  createEvent(e){
    const event_name = document.getElementById("event_name").value;
    const number_of_members = document.getElementById("number_of_members").value;

    if(event_name===""){
      alert("Please fill in the event name!");
    }
    else if(number_of_members===""){
      alert("Please fill in the event name!");
    }
    else{
      alert ("The event has been successfully created!");
    }
  }

  keyEvent (e) {
    if (e.key === 'Enter') {
      this.createEvent();
    }
  }

  render() {
    document.title = 'Create an Event';
    return (
      <div className="container" onKeyPress={this.keyEvent}>
        <NavBar/>

        <div className="login-bar">
          <div className="header">
            <h2>Create an Event</h2>
          </div>
          <form method="post">
            <div className="input-group">
              <label>Event Name*</label>
              <input type="text" name="event_name" id="event_name" placeholder=""></input>
            </div>
            <div className="input-group">
              <label>Number of members*</label>
              <input type="number" name="number_of_members" id="number_of_members" placeholder=""></input>
            </div>

            <div class="input-group">
              <label>Category*</label>

              <select class="custom-select" id="inputGroupSelect01">
                <option selected>Choose Category</option>
                <option value="1">Outdoor</option>
                <option value="2">Indoor</option>
                <option value="3">Others</option>
              </select>
            </div>

            <div className="input-group">
              <label>Need/Equipment</label>
              <input type="text" name="need" id="need" placeholder=""></input>
            </div>

            <div className="input-group">
              <label>Approximate Time</label>
              <input type="text" name="time" id="time" placeholder=""></input>
            </div>

            <div className="input-group">
              <label>Event Photo*</label>
              <ImageUpload/>
            </div>

            <div>
              <input type="button" className="btn" onClick={this.createEvent} id="submitBtn" name="create_btn" value="CREATE"/>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default CreateEvents;
