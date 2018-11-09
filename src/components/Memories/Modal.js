import React, { Component } from 'react';
import photos from '../../img/bike.jpg';
import '../../css/Memories.css';

class Modal extends Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <img src={photos} alt={photos} className="carousel"></img>
          <button className="glyphicon glyphicon-menu-left button prev"></button>
          <button className="glyphicon glyphicon-menu-right button next"></button>
          <button onClick={this.props.closeModal}>close</button>
        </div>
      </div>
    );
  }
}

export default Modal;
