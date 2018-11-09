import React, { Component } from 'react';
import '../../css/App.css';
import NavBar from '../NavBar'
import Comments from './Comments'
import CommentBox from './CommentBox'
import eventPhoto from '../../img/bike.jpg'

class EventDetails extends Component {

  constructor(props) {
    super(props);
    this.handleAddComment = this.handleAddComment.bind(this);
    this.state = {
      comments: [{name: "Lan Wang", comment: "Really enjoy it with my family!"}
      ,{name: "Lan Wang", comment: "Really enjoy it with my family!"}]
    }
  }

  componentDidMount() {
    /*global Ably*/
    const channel = Ably.channels.get('comments');

    channel.attach();
    channel.once('attached', () => {
      channel.history((err, page) => {
        // create a new array with comments only in an reversed order (i.e old to new)
        const comments = Array.from(page.items.reverse(), item => item.data)

        this.setState({ comments });
      });
    });
  }

  handleAddComment(comment) {
    this.setState(prevState => {
      return {
        comments: prevState.comments.concat(comment)
      };
    });
  }

  render() {
    var eventCard = {
      "height": "500px",
      "width": "350px",
      // "marginTop": "8%",
      "border": "1px solid black"
    };

    var number = {
      "fontSize": "20px",
      "paddingLeft": "35px",
      "marginTop": "30px",
    };

    return (
      <div className="Page">
        <NavBar/>

        <h1><span className="primary" >Event Detail</span></h1>
        <div className="row d-flex justify-content-center">
          <div className="col-lg-2">
          </div>
          <div className="col-lg-4">
            <div style={eventCard}>
              <img src={eventPhoto} style={{width: "100%"}}></img>
              <h1 style={{textAlign: "center"}}>Riding bike</h1><br/>
              <div className="glyphicon glyphicon-user" style={number}> 2-3</div>
              <h3 style={number}>Outdoor</h3>
              <h4 style={{float: "left", paddingLeft: "35px"}}>Need: bike</h4>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="columns">
              <div className="column ">
                <Comments comments={this.state.comments.reverse()} />
                <CommentBox handleAddComment={this.handleAddComment} />
              </div>
            </div>
          </div>

        </div>
      </div>

    );
  }
}

export default EventDetails;
