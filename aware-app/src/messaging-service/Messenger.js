import React, { Component } from 'react';
import './Messenger.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'

import NavBar from './NavigationBar/NavBar/NavBar'
import ChatWindow from './ChatFeature/ChatWindow/ChatWindow'
import ChatTitle from './ChatFeature/ChatTitle/ChatTitle'
import DirectMessages from './ChatSelector/DirectMessages/DirectMessages'
import MessageInput from './ChatFeature/MessageInput/MessageInput'

import io from 'socket.io-client'

class Messenger extends Component {
  constructor() {
    super()

    this.state = {
      name: tempName(),
      messages: [],
      socket: io(),
      chatTitle: ""
    }

    this.state.socket.on('chat message', message => {
      this.setState({
        messages: this.state.messages.concat([message])
      })
    })
  }

  render() {
    const {selectRoom, sendMessage } = this;
    return (
      <div class="container-fluid" className="Messenger">
        <div class="row aware-container">
          <div class="col-1 aware-column">
            <NavBar selectRoom={selectRoom}/>
          </div>

          <div class="col-8 aware-column">
            <ChatTitle chatTitle={this.state.chatTitle} />
            <ChatWindow messages={this.state.messages} name={this.state.name} />
            <MessageInput sendMessage={sendMessage} name={this.state.name}/>
          </div>

          <div class="col-3 aware-column">
            <DirectMessages />
          </div>
        </div>
      </div>
    );
  }

  selectRoom = (room) => {
    this.state.socket.emit('room', room)
    this.setState({ 
      messages: [],
      chatTitle: room,
     });
  }

  sendMessage = (message) => {
    this.state.socket.emit('chat message', message)
  }
}

function tempName() {
  var name = prompt("Please enter your name:", "Bot1");
  if (name === null || name === "") {
    return "Bot1";
  } else {
    return name;
  }
}

export default Messenger;
