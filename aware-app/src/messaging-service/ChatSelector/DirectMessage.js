import React, { Component } from 'react';
import './DirectMessage.css';

class DirectMessage extends Component {
  render() {
    const { src, name } = this.props;
    return (
      <div class="direct-message">
        <div class="direct-message-avatar col-xs-12 col-sm-2">
          <img src={process.env.PUBLIC_URL + src} alt={name} />
        </div>

        <div class="direct-message-content col-9 pr-0">
          <p>{name}</p>
          <p class="direct-message-preview">Preview of last message...</p>
        </div>
      </div>

    );
  }
}

export default DirectMessage;
