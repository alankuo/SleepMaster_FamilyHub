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

            <ul className='cards'>
                <li className='cards-card'>

                    <Card icon={2} />
                </li>
                <li className='cards-card'>

                    <Card icon={0} />
                </li>
                <li className='cards-card'>

                    <Card icon={1}/>
                </li>






            </ul>


    );
  }
}

export default Cards;