import React, { Component } from 'react';
import Card from './Card';
const styles = {
    'cards': {
        width: '100%',
        listStyle: 'none',
        margin: '0',
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
        height: '600px',
        padding: '20px'
    }
}
class Cards extends Component {
  render() {
    return (

        <div className='container'>
        <ul className='row' style={styles.cards}>
            <li className='col-sm-12 col-md-6 col-lg-4' style={styles.card}>

                <Card icon={1} />
            </li>
            <li className='col-sm-12 col-md-6 col-lg-4' style={styles.card}>

                <Card icon={0} />
            </li>
            <li className='col-sm-12 col-md-6 col-lg-4' style={styles.card}>

                <Card />
            </li>
            <li className='col-sm-12 col-md-6 col-lg-4' style={styles.card}>

                <Card />
            </li>




        </ul>
        </div>


    );
  }
}

export default Cards;