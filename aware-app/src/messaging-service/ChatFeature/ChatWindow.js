import React, { Component } from 'react';
import ReceivedMessage from "./ReceivedMessage"
import SentMessage from "./SentMessage"
import './ChatWindow.css'

class ChatWindow extends Component {
  components = {
    sentMessage: SentMessage,
    receivedMessage: ReceivedMessage
  };

scrollToBottom = () => {
  this.messagesEnd.scrollIntoView({ behavior: "auto" });//animate it to behavior:smooth
}

componentDidMount() {
  this.scrollToBottom();
}

componentDidUpdate() {
  this.scrollToBottom();
}

  render() {
    //Can change to this.components.sentMessage to change its rendering.
    var Message = this.components.sentMessage;

    return(
      <div id="chat">
        {this.props.messages.map(message => {
          if (message.studentName === "Josh") {
            Message = this.components.sentMessage;
          } else {
            Message = this.components.receivedMessage;
          }
          return (
            <Message student={message.studentName} avatar={message.avatar} message={message.text} timestamp={message.timestamp}/>
          )
        })}
        <div id="scrollbar" ref={(el) => {
          this.messagesEnd = el;
        }}></div>
      </div>

    );
  }
}

export default ChatWindow;
