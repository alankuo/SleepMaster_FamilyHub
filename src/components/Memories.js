import React, { Component } from 'react';
import '../css/App.css';
import NavBar from './NavBar'

class Memories extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>
        <p style={{padding:300+"px", fontSize:30}}>Memories TBD...</p>
      </div>
    );
  }
}

export default Memories;
