import React, { Component } from 'react';
import '../../css/App.css';
import NavBar from '../NavBar'
import Comments from './Comments'
import CommentBox from './CommentBox'
import eventPhoto from '../../img/bike.png'
class EventDetails extends Component {

  constructor(props) {
    super(props);
    this.handleAddComment = this.handleAddComment.bind(this);
    this.state = {
      comments: [{name: "Lan Wang", comment: "Really enjoy it with my family!"}
      ,{name: "Yuhan Wang", comment: "Like it!"}]
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
  goback() {
    window.location = "#/discover-event";
  }

  render() {
    const swipe_card = {
      "width": "50vh",
      "height": "80vh",
      "min-height": "480px",
      "min-width": "300px",
      "border-radius": "20px",
      "overflow": "hidden",
      "position": "fixed",
      "margin-top": "15px",

      "box-shadow": "0 3px 12px 3px rgba(0,0,0,0.2)",
      "background-color": "white",
    };


    return (
      <div className="Page">
        <NavBar/>

        {/*<h1><span className="primary" >Event Detail</span></h1>*/}
        <div className="row d-flex justify-content-center">
          <div className="col-lg-2">

            <button style={{left:"20%", marginTop:"10%"}} type="button" className="btn btn-default btn-lg glyphicon glyphicon-arrow-left" onClick={this.goback}/>
          </div>
          <div className="col-lg-4">
            <div style={swipe_card}>
              <img className="img-responsive" src={eventPhoto} />
              <div className="swipe-card-bot">
                <h1>Riding bike</h1>
                <div className="swipe-people glyphicon glyphicon-user"> 2-3</div>
                <h4 className="swipe-type">Outdoor</h4>
                <h4 >Need: bike</h4>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="columns">
                <Comments comments={this.state.comments.reverse()} />
                <CommentBox handleAddComment={this.handleAddComment} />
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default EventDetails;
