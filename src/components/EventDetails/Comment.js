import React, { Component } from 'react';

class Comment extends Component {
  render() {
    return (
      <article className="media">
        {/*<div className="media-content">*/}
          <div className="container">
            <p>
              <strong>Name: </strong>
              {this.props.comment.name}
            </p>
            <p>
              <strong>Comment: </strong>
              {this.props.comment.comment}
            </p>
          </div>
        {/*</div>*/}
      </article>
    );
  }
}

export default Comment;