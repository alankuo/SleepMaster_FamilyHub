import React, { Component } from 'react';
import Comment from './Comment';

class Comments extends Component {
  render() {


    return (
      <div>
        <h1 className="title">Comments</h1>
      <section className="section">

        {
          this.props.comments.map((comment, index) => {
            return <Comment key={index} comment={comment} />
          })
        }
      </section>
      </div>
    );
  }
}

export default Comments;