import React, { Component } from 'react';

import Home from './Home2/Home';
import NavBar from './NavBar'
import Footer from './Footer'

class App extends Component {
  render() {
    return (
      // <div className="Page">
      <div>
        <NavBar />
        <Home />
        <Footer />

      </div>
    );
  }
}

export default App;
