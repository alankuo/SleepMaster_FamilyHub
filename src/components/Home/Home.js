import React, { Component } from 'react';
import familyPhoto from '../../img/family_photo.jpg'
import NoteBoard from './NoteBoard';
import Cards from './Cards';


const styles = {
    top: {
        width: '100%',
    },
    photoSection: {
        width: '70%',
        position: 'absoulte',
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
        width: '100%',
        padding: '10px',
        // border: '1px solid grey',
        borderRadius: '20px',
    },
    familyPhoto: {
        width: '100%',
        borderRadius: '20px',
    },

}
class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="top" style={styles.top}>
            <div style={styles.photoSection}>
                <div style={styles.photo}>
                    <img src={familyPhoto} style={styles.familyPhoto}/>
                </div>
            </div>
            <div style={styles.noteBoard}>
                <NoteBoard />
            </div>
            <div style={styles.clearfix} />
        </div>
        <Cards />
      </div>
    );
  }
}

export default Home;