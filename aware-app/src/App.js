import React, { Component } from 'react';
import './style/App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import NavBar from './messaging-service/NavBar/NavBar'
import ChatTitle from './messaging-service/ChatFeature/ChatTitle'
import DirectMessages from './messaging-service/DirectMessage/DirectMessages'
import MessageInput from './messaging-service/ChatFeature/MessageInput'
import ChatWindow from './messaging-service/ChatFeature/ChatWindow'
import io from 'socket.io-client'

class App extends Component {
  constructor() {
    super()

    this.state = {
      name: tempName(),
      messages: [],
      socket: io()
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
      <div class="container-fluid" className="App">
        <div class="row aware-container">
          <div class="col-1 aware-column">
            <NavBar selectRoom={selectRoom}/>
          </div>

          <div class="col-8 aware-column">
            <ChatTitle course="SYSC 2100" />
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

export default App;
