import React from 'react';
import './DirectMessages.css';
import DirectMessage from '../DirectMessage/DirectMessage'

type DirectMessagesProps = { };

type DirectMessagesState = { };

export default class DirectMessages extends React.Component<DirectMessagesProps, DirectMessagesState> {
  render() {
    return (
      <div id="direct-messages" className="row">
        <p id="courses" className="col-12">Private Messages</p>
        <input id="textfield" placeholder="Search Messages..." />
        <DirectMessage src="/icons8-user-80.png" name="Josh Campitelli" />
        <DirectMessage src="/icons8-user-80.png" name="Arsalan Sadiq" />
        <DirectMessage src="/icons8-user-80.png" name="Ahmed Sakr" />
        <DirectMessage src="/icons8-user-80.png" name="TheRealBoys" />
      </div>
    );
  }
}
