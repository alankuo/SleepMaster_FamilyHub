import React, { Component } from 'react';
import familyPhoto from '../../img/family_photo.jpg';
import NoteBoard from './NoteBoard';
import Cards from './Cards';
import './Home.css';


class Home extends Component {
  constructor() {
    super();

    // Initial state
    this.state = {
      photoURL: familyPhoto
    };

    // Bind all functions so they can refer to "this" correctly
  }

  componentWillMount() {
    if(localStorage['familyPhoto'] !== undefined) {
      this.setState({photoURL: localStorage['familyPhoto']})
    }
  }

  render() {
    return (
      <div className="home clearfix">
        <div className="home-top clearfix">
            <div className="home-photo-section">
                <div className="home-photo">
                    <img src={this.state.photoURL} alt={this.state.photoURL} className="home-photo-img"/>
                </div>
            </div>
            <Cards />
            {/*  */}
        </div>
        <div className="home-noteboard-section">
          <NoteBoard />
        </div>
      </div>
    );
  }
}

export default Home;
