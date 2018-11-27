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
    let family_name = localStorage.getItem('family_name');
    family_name = family_name ? family_name : "My Family";
    return (
      <div className="homepage">
      <div className="home2 clearfix">

        <h1 className="home2-title">{family_name} </h1>

        <div className="home2-photo-section">
          <div className="home2-photo">
            <img src={this.state.photoURL} alt={this.state.photoURL} className="home2-photo-img"/>
          </div>
        </div>

        <NoteBoard/>
        <Cards/>
      </div>
      </div>
    );
  }
}

export default Home;
