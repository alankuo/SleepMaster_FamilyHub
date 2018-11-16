import React, { Component } from 'react';
import '../css/Create.css';
import NavBar from './NavBar';
import { Link } from 'react-router-dom'

class Create extends Component {
  render() {
    return (
      <div className="App">
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
    );
  }
}

export default Create;
