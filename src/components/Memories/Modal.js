import React, { Component } from 'react';
import photos from '../../img/bike.jpg';
import '../../css/Memories.css';

const modal = {
  'height': '300px',
  'width': '300px',
  'backgroundColor': 'red',
}

class Modal extends Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <img src={photos} className="carousel"></img>          
          <button onClick={this.props.closeModal}>close</button>
        </div>
      </div>
    );
  }
}

export default Modal;
