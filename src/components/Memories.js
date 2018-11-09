import React, { Component } from 'react';
import '../css/App.css';
import '../css/Memories.css';
import NavBar from './NavBar';
import photo from '../img/bike.jpg'

class Memories extends Component {
  render() {
    return (
      <div classNameName="App">
        <NavBar />
        <div className="memory">
          <div className="year">2018</div>
          <div className="timeline">
            <p className="time-left">11/07</p>
            <div className="photos left">
              <button className="button">
                <img src={photo} onClick={() => alert('click')}></img>
              </button>
            </div>
            <p className="time-right">11/07</p>
            <div className="photos right">
              <button className="button">
                <img src={photo}></img>
              </button>
            </div>
            <p className="time-left">11/07</p>
            <div className="photos left">
              <button className="button">
                <img src={photo}></img>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Memories;
