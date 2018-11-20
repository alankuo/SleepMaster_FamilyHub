import React, { Component } from 'react';
import '../css/Create.css';
import NavBar from './NavBar';
import { Link } from 'react-router-dom'
import bg from '../img/background45.jpg';

const background = {
  background: `url(${bg}) no-repeat center center fixed`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
}

class Create extends Component {
  render() {
    return (
      <div style={{backgroundColor: 'black'}}>
      <div>
        <div className="create-page">
          <Link to="/create-family">
            <button className="create">
              Create a New Family Group
            </button>
          </Link>
          <Link to="/join-family">
            <button className="join">
              Join an Existing Family
            </button>
          </Link>
        </div>
      </div>
      </div>
    );
  }
}

export default Create;
