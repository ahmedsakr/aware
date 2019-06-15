import React, { Component } from 'react';
import './DirectMessage.scss';

class DirectMessage extends Component {
  render() {
    const { src, name } = this.props;
    return (
      <div class="col-12 direct-message">
        <div class="direct-message-avatar col-2">
          <img src={process.env.PUBLIC_URL + src} alt={name} />
        </div>

        <div class="direct-message-content col-10">
          <p class="col-12">{name}</p>
          <p class="direct-message-preview">Preview of last message...</p>
        </div>
      </div>

    );
  }
}

export default DirectMessage;
