import React, { Component } from 'react';

import Home from './Home/Home';
import NavBar from './NavBar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Home />

      </div>
    );
  }
}

export default App;
