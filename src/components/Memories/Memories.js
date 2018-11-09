import React, { Component } from 'react';
import '../../css/App.css';
import '../../css/Memories.css';
import NavBar from '../NavBar';
import photo from '../../img/bike.jpg';
import Modal from './Modal.js';

class Memories extends Component {
  constructor() {
    super();
    this.state = {
      show: false
    };
  }

  showModal() {
    this.setState({show: true});
  }

  hideModal() {
    this.setState({show: false});
  }

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
                <img src={photo} alt={photo} onClick={this.showModal.bind(this)}></img>
                {this.state.show ?
                  <Modal closeModal={this.hideModal.bind(this)} />
                  : null
                }
              </button>
            </div>

            <p className="time-right">11/06</p>
            <div className="photos right">
              <button className="button">
                <img src={photo} alt={photo} onClick={this.showModal.bind(this)}></img>
                {this.state.show ?
                  <Modal closeModal={this.hideModal.bind(this)} />
                  : null
                }
              </button>
            </div>

            <p className="time-left">11/01</p>
            <div className="photos left">
              <button className="button">
                <img src={photo} alt={photo} onClick={this.showModal.bind(this)}></img>
                {this.state.show ?
                  <Modal closeModal={this.hideModal.bind(this)} />
                  : null
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Memories;
