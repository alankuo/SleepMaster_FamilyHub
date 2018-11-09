import React, { Component } from 'react';
import familyPhoto from '../../img/family_photo.jpg';
import NoteBoard from './NoteBoard';
import Cards from './Cards';
import './Home.css';


class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="home-top clearfix">
            <div className="home-photo-section">
                <div className="home-photo">
                    <img src={familyPhoto} alt={familyPhoto} className="home-photo-img"/>
                </div>
            </div>
            <div className="home-noteboard-section">
                <NoteBoard />
            </div>
        </div>
        <Cards />
      </div>
    );
  }
}

export default Home;
