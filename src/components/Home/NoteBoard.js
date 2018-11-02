import React, { Component } from 'react';

const styles={
    noteBoard: {
        boxSizing: 'border-box',
    },
    textarea: {
        width: '100%',
        height: '200px',
        resize: 'none',
        padding: '10px',
        // left: '50%',
        // top: '50%',
        // transform: 'translate(-50%,-50%)'
    }
}
class NoteBoard extends Component {
  render() {
    return (

        <div style={styles.noteBoard}>
          <p> Message Board</p>
          <textarea style={styles.textarea} value = "Leave a message for your family!">
          </textarea>
          <input type="submit" value="Save" />
        </div>
    );
  }
}

export default NoteBoard;