import React, { Component } from 'react';
import '../css/Create.css';
import NavBar from './NavBar';
import { Link } from 'react-router-dom'

class Create extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="create-page">
          <Link to="/create-family">
            <button className="create">
              Create a new family account
            </button>
          </Link>
          <Link to="/join-family">
            <button className="join">
              Join an existed family
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Create;
