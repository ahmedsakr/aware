import React, { Component } from 'react';
import './SentMessage.css';

class SentMessage extends Component {

  render() {
    const { student, avatar, message, timestamp } = this.props;

    return (
      <div class="sentMessage">
        <div class="col-sm-3 sentMessage-timestamp">
          {timestamp}
        </div>
        <div class="col-sm-7 sentMessage-text">
          {message}
        </div>
        <div class="col-sm-2 sentMessage-profile">
          <img class="sentMessage-profile-img" src={process.env.PUBLIC_URL + avatar} alt={student} />
          <p class="sentMessage-profile-name">{student}</p>
        </div>
      </div>
    );
  }
}

export default SentMessage;
