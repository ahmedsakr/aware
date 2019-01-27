import React, { Component } from 'react';
import Message from "./Message"
import './ChatWindow.css'

class ChatWindow extends Component {
  render() {
    return(
      <div id="chat">
        {this.props.messages.map(message => {
          return (
            <Message student={message.studentName} avatar={message.avatar} message={message.text} timestamp={message.timestamp}/>
          )
        })}
      </div>
    );
  }
}

export default ChatWindow;
