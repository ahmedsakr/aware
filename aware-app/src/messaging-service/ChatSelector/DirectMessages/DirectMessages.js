import React, { Component } from 'react';
import './DirectMessages.scss';
import DirectMessage from '../DirectMessage/DirectMessage'

class DirectMessages extends Component {
  render() {
    return (
      <div id="direct-messages" class="row">
        <p id="courses" class="col-12">Private Messages</p>
        <input id="textfield" placeholder="Search Messages..." />
        <DirectMessage src="/icons8-user-80.png" name="Josh Campitelli" />
        <DirectMessage src="/icons8-user-80.png" name="Arsalan Sadiq" />
        <DirectMessage src="/icons8-user-80.png" name="Ahmed Sakr" />
        <DirectMessage src="/icons8-user-80.png" name="TheRealBoys" />
      </div>
    );
  }
}

export default DirectMessages;
