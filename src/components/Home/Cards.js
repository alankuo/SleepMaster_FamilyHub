import React, { Component } from 'react';
import Card from './Card';
const styles = {
    'cards': {
        width: '100%',
        maxWidth: '2000px',
        listStyle: 'none',
        margin: '0',
        border: '1px solid black',
        padding: '0',
        boxSizing: 'border-box'

    },
    cardRow: {
        margin: '0',
        border: '1px solid black',
        padding: '0',
        boxSizing: 'border-box'
    },
    card: {
        height: '800px',
        padding: '0',
        margin: '0'
    }
}
class Cards extends Component {
  render() {
    return (
        <ul class='container' style={styles.cards}>
            <li class='row'>
                <div class='col-sm-12 col-md-12 col-lg-4' style={styles.card} >
                    <Card />
                </div>
                <div class='col-sm-12 col-md-12 col-lg-4' style={styles.card}>
                    <Card />
                </div>
                <div class='col-sm-12 col-md-12 col-lg-4' style={styles.card}>
                    <Card />
                </div>
            </li>


        </ul>


    );
  }
}

export default Cards;