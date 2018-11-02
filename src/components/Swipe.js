import React, { Component } from 'react';
import eventPhoto from '../img/bike.jpg'
import './App.js';
import NavBar from './NavBar.js';
import {Link} from 'react-router-dom';

class Swipe extends Component {
  render() {
    var leftIcon = {
      "fontSize": "35px",
      "marginTop": "250px",

    }

    var rightIcon = {
      "fontSize": "35px",
      "marginTop": "250px"
    }

    var eventCard = {
      "height": "500px",
      "width": "350px",
      "marginTop": "8%",

      "border": "1px solid black"
    }

    var number = {
      "fontSize": "20px",
      "paddingLeft": "35px",
      "marginTop": "30px",
    }

    return (
      <div>
        <NavBar />
        <div className="container" style={{marginTop: "8%"}}>
          <div className="row">
            <div className="col-lg-4">
              <button className="glyphicon glyphicon-menu-left" style={leftIcon}></button>
            </div>
            <div className="col-lg-6">
              <div style={eventCard}>
                <img src={eventPhoto} style={{width: "100%"}}></img>
                <h1 style={{textAlign: "center"}}>Riding bike</h1><br/>
                <div className="glyphicon glyphicon-user" style={number}> 2-3</div>
                  <h3 style={number}>Outdoor</h3>
                  <h4 style={{float: "left", paddingLeft: "35px"}}>Need: bike</h4>
                  <Link to="/event-detail" style={{float: "right", fontSize: "25px"}}>Detail ></Link>
              </div>
            </div>
            <div className="col-lg-2">
              <button className="glyphicon glyphicon-menu-right" style={rightIcon}></button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Swipe;
