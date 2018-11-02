import React, { Component } from 'react';
import searchIcon from '../../img/magnifier-tool.png'

const styles = {
    card: {
        width:'100%',
        height: '100%',
        border: '1px solid black',
        margin: '0',
        padding: '0'
    },
    icon: {
        margin: 'auto',
    }
}
class Card extends Component {
  render() {
    return (
        <div style={styles.card}>
            <img src={searchIcon} style={styles.icon}/>
        </div>

    );
  }
}

export default Card;