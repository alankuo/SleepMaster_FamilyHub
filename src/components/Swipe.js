import React, { Component } from 'react';
import './App.js';

class Swipe extends Component {
  render() {
    var homeIcon = {
      "fontSize": "40px",
      "marginTop": "2%"
    }

    var leftIcon = {
      "fontSize": "30px",
    }

    var rightIcon = {
      "fontSize": "30px",
      "marginLeft": "80%"
    }

    return (
      <div className="container">
        <a className="glyphicon glyphicon-home" style={homeIcon} href="./App.js"></a>
        <button className="glyphicon glyphicon-menu-left" style={leftIcon}></button>
        <button className="glyphicon glyphicon-menu-right" style={rightIcon}></button>
      </div>
    );
  }
}

export default Swipe;
