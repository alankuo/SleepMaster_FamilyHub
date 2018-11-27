import React, { Component } from 'react';
import Card from './Card';

class Cards extends Component {
  render() {
    return (

            <ul className='cards2 clearfix'>
                <li className='cards2-card'>

                    <Card icon={0} />
                </li>
                <li className='cards2-card'>

                    <Card icon={2} />
                </li>
                {/* <li className='cards2-card'>

                    <Card icon={1}/>
                </li>

                <li className='cards2-card'>

                    <Card icon={1}/>
                </li> */}

            </ul>


    );
  }
}

export default Cards;
