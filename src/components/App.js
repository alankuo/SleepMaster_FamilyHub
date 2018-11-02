import React, { Component } from 'react';
import '../css/App.css';
import { Link } from 'react-router-dom'
import NavBar from './NavBar'


class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Link to='/login'>Back</Link>
        </header>
      </div>
    );
  }
}

export default App;
