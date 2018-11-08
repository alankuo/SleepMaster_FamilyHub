import React, { Component } from 'react';
import familyPhoto from '../../img/family_photo.jpg';
import NoteBoard from './NoteBoard';
import Cards from './Cards';
import './Home.css';


const styles = {
    top: {
        width: '100%',
    },
    photoSection: {
        width: '70%',
        height: '100%',
        padding: '5%',
        boxSizing: 'border-box',
        float: 'left'
    },
    noteBoard: {
        width: '25%',
        paddingTop: '10%',
        height: '100%',
        boxSizing: 'border-box',
        float: 'left'

    },
    clearfix: {
        overflow: 'auto',
    },
    photo: {
        height: '100%',
        padding: '5px',
        boxShadow: '0 6px 12px 0 rgba(0,0,0,0.2)',
        borderRadius: '20px',
    },
    familyPhoto: {
        height: '200px',
        borderRadius: '20px',
    },

}
class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="home-top clearfix">
            <div className="home-photo-section">
                <div className="home-photo">
                    <img src={familyPhoto} className="home-photo-img"/>
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