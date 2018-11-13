import React, { Component } from 'react';
import '../../css/App.css';
import '../../css/Memories.css';
import NavBar from '../NavBar';
import photo from '../../img/party.jpg';
import Modal from './Modal.js';
import request from 'then-request';

class Memories extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      id: null,
      pics: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    // this.renderModal = this.renderModal.bind(this);
    // this.performAll = this.performAll.bind(this);
  }

  componentDidMount() {
    request('GET', 'assets/data/memories.json', {json: true}).done((res)=> {
      var response = JSON.parse(res.getBody());
      const arr = [];
      for (let i=0; i < response.memories.length; i++) {
        const memory = response.memories[i];
        arr.push(new Info(memory.img, memory.date, memory.i));
      }
      console.log(arr);
      this.setState({
        pics: arr,
      });
    });
  }

  handleClick(e) {
    // if (this.state.id != null) {
    //   document.addEventListener('click', this.handleOutsideClick, false);
    //   console.log("added");
    // }
    // else {
    //   document.removeEventListener('click', this.handleOutsideClick, false);
    // }
    this.setState({
      id: e.target.id,
    });
  }

  handleOutsideClick(e) {
    if (e.target.tagName != "IMG" && e.target.tagName != "BUTTON") {
      this.setState({
        id: null,
      });
    }
    return;
  }
  // handleClick(e) {
  //   console.log("show state: " + this.state.show);
  //   if (this.state.id != null) {
  //     document.addEventListener('click', this.handleOutsideClick, false);
  //     console.log("added");
  //   }
  //   else {
  //     document.removeEventListener('click', this.handleOutsideClick, false);
  //   }
  //   this.setState({
  //     id: null,
  //   });
  // }

  // handleOutsideClick(e) {
  //   if (this.node.contains(e.target)) {
  //     return;
  //   }
  //   this.handleClick();
  //   console.log("clicked");
  // }
  //
  // renderModal(e) {
  //   console.log("renderModal");
  //   this.setState({
  //     id: e.target.id,
  //   });
  // }
  //
  // performAll(e) {
  //   this.handleClick();
  //   this.renderModal(e);
  // }

  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="memory">
          <div className="year">2018</div>
          <div className="timeline">
              {this.state.pics.map((pics) =>
                <div key={pics.i}>
                  <p
                    className={(parseInt(pics.i, 10) % 2 === 1 ? 'time-left':'time-right')}
                  >
                    {pics.date}
                  </p>
                  <div
                    className={(parseInt(pics.i, 10) % 2 === 1 ? 'photos left':'photos right')}
                    ref={node => {this.node = node;}}
                  >
                    <button className="button">
                      <img
                        src={pics.image}
                        alt={photo}
                        id={pics.i}
                        onClick={this.handleClick}
                        style={{'width': '100%'}}
                      />
                    </button>
                    {this.state.id == pics.i && (
                      <Modal
                        pics={pics.image}
                        closeModal={this.handleOutsideClick}
                      />
                    )}
                  </div>
                </div>
               )
              }          
          </div>
        </div>
      </div>
    );
  }
}

class Info {
  constructor(image, date, i) {
    this.image = image;
    this.date = date;
    this.i = i;
  }
  json() {
    return {"img": this.image, "date": this.date, "i": this.i}
  }
}


export default Memories;
