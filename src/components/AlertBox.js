import React, {Component} from 'react';
import '../css/AlertBox.css';
import {Link} from 'react-router-dom';

class AlertBox extends Component {
  render() {
    if (this.props.type === "success_info") {
    return(
      <div className="alert_success_info">
          <div className="glyphicon glyphicon-ok success"/>
          <p className="alert_msg">{this.props.alertMsg}</p>
          <p style={{textAlign:"center", color:"#4C5356", fontWeight:"bold", fontSize:"20px"}}>What do you want to do next?</p>
          <br/>
          {/**<Link to="/favorite-event" className="next-step">Add the event to favorite page</Link>**/}
          <Link to="/" className="next-step" style={{float: "left"}}>Go back to home page</Link>
          <Link to="/create-event" className="next-step" onClick={this.props.close} style={{float: "right"}}>Create another event</Link>
      </div>
    );}
    return(
      <div className={(this.props.type === "success" ? "alert_success" : "alert_warning")}>
          <div
            className={(this.props.type === "success" ? "glyphicon glyphicon-ok success": "glyphicon glyphicon-exclamation-sign warning")}
          />
          <p className="alert_msg">{this.props.alertMsg}
            <button onClick={this.props.close} className="close_alert glyphicon glyphicon-remove">
            </button>
          </p>

      </div>
    );
  }
}

export default AlertBox;
