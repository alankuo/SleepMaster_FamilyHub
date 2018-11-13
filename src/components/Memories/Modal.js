import React, { Component } from 'react';
import '../../css/Memories.css';

class Modal extends Component {
  render() {
    return (
      <div className='popup' onClick={this.props.closeModal}>
        <div className='popup_inner'>
            <img src={this.props.pics} alt={this.props.pics} className="carousel"></img>
            <button className="glyphicon glyphicon-menu-left button prev"></button>
            <button className="glyphicon glyphicon-menu-right button next"></button>
        </div>
      </div>
    );
  }
}

export default Modal;
