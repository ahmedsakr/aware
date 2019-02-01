import React, { Component } from 'react';
import Message from "./Message"
import SentMessage from "./SentMessage"
import './ChatWindow.css'

class ChatWindow extends Component {
  components = {
    sentMessage: SentMessage,
    message: Message
  };

  render() {
    //Can change to this.components.sentMessage to change its rendering.
    const TagName = this.components.message;

    return(
      <div id="chat">
        {this.props.messages.map(message => {
          return (
            <TagName student={message.studentName} avatar={message.avatar} message={message.text} timestamp={message.timestamp}/>
          )
        })}
      </div>
    );
  }
}

export default ChatWindow;
