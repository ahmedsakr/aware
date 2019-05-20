import React, { Component } from 'react';
import Message from "./Message/Message"
import './ChatWindow.css'

class ChatWindow extends Component {

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
    return(
      <div id="chat">
        <div id="chat-messages">
          {
            this.props.messages.map(message => {
              return (
                <Message name={this.props.name} content={message} />
              )
            })
          }
          <div id="scrollbar" ref={(el) => {
            this.messagesEnd = el;
          }}></div>
        </div>

      </div>

    );
  }
}

export default ChatWindow;
