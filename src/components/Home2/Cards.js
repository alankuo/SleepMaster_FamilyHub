import React, { Component } from 'react';
import Card from './Card';

class Cards extends Component {
  render() {
    return (

            <ul className='cards clearfix'>
                <li className='cards-card'>

                    <Card icon={2} />
                </li>
                <li className='cards-card'>

                    <Card icon={0} />
                </li>
                {/* <li className='cards-card'>

                    <Card icon={1}/>
                </li> */}

            </ul>


    );
  }
}

export default Cards;
