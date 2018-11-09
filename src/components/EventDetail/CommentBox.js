import React, { Component } from 'react';

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.addComment = this.addComment.bind(this);
  }

  addComment(e) {
    // Prevent the default behaviour of form submit
    e.preventDefault();

    // Get the value of the comment box
    // and make sure it not some empty strings
    const comment = e.target.elements.comment.value.trim();
    const name = e.target.elements.name.value.trim();

    // Make sure name and comment boxes are filled
    if (name && comment) {
      const commentObject = { name, comment };

      this.props.handleAddComment(commentObject);

      // Publish comment
      /*global Ably*/
      const channel = Ably.channels.get('comments');
      channel.publish('add_comment', commentObject, err => {
        if (err) {
          console.log('Unable to publish message; err = ' + err.message);
        }
      });

      // Clear input fields
      e.target.elements.comment.value = '';
      e.target.elements.name.value = '';
    }
    else{
      alert ("Please fill in your name or comment section!");
    }
  }

  render() {
    return (
      <div>
        <h1 className="title">Comments</h1>
        <form onSubmit={this.addComment}>
          <div className="input-group">
            <div className="control">
              <label>Your Name</label>
              <input type="text" className="input" name="name" placeholder="Your name"/>
            </div>
          </div>
          <div className="input-group">
            <div className="control">
              <label>Comment</label>
              <input className="textarea" name="comment" placeholder="Add a comment"/>
              {/*<textarea className="textarea" name="comment" placeholder="Add a comment"></textarea>*/}
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="btn is-primary">Submit</button>
            </div>

          </div>

        </form>
      </div>
    );
  }
}

export default CommentBox;