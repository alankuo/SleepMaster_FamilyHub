import React, { Component } from 'react';
import familyPhoto from '../../img/logo.svg'
import NoteBoard from './NoteBoard';
import Cards from './Cards';


const styles = {
    familyPhoto: {
        'width' : '100%',

    }
}
class Home extends Component {
  render() {
    return (
      <div className="Home">
        <img src={familyPhoto} style={styles.familyPhoto}/>
        {/* <NoteBoard /> */}
        <Cards />
      </div>
    );
  }
}

export default Home;