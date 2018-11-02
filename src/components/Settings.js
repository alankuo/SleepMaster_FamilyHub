import React, { Component } from 'react';
import '../css/App.css';
import NavBar from './NavBar'

class Settings extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>
        <p style={{padding:300+"px", fontSize:30}}>Settings TBD...</p>
      </div>
    );
  }
}

export default Settings;
