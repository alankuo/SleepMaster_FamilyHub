import React from 'react';
import {Link} from 'react-router-dom';
import logo from "../img/logo.png"

const styles = {
  image: {
    width: "7vw",

    display: "block",
    marginLeft: "4%",
    float: "left",
  }
}

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      homeVal:"",
    };

    // Bind all functions so they can refer to "this" correctly
    //this.updateValue = this.updateValue.bind(this);
  }
  render(){
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <Link to="/"><img src={logo} alt="" style={styles.image}/></Link>
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
          <div id="navbar" className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li style={{padding:16+"px", fontSize:18, fontWeight:"bold"}}><Link to="/">Home</Link></li>
              <li style={{padding:16+"px", fontSize:18, fontWeight:"bold"}}><Link to="/create-event">Create Event</Link></li>
              <li style={{padding:16+"px", fontSize:18, fontWeight:"bold"}}><Link to="/settings">Settings</Link></li>
              <li style={{padding:16+"px", fontSize:18, fontWeight:"bold"}}><Link to="/login">Logout</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
// <li className={this.state.profileVal} style={{padding:16+"px", fontSize:18, fontWeight:"bold"}}><Link to="/memories">Memory Album</Link></li>
