import React, { Component } from 'react';
import './style/App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'

import NavBar from './messaging-service/NavigationBar/NavBar/NavBar'
import ChatSelector from './messaging-service/ChatSelector/ChatSelector'
import ChatWindow from './messaging-service/ChatFeature/ChatWindow/ChatWindow'
import ActivityPanel from './messaging-service/ChatFeature/ActivityPanel/ActivityPanel'
import MessageInput from './messaging-service/ChatFeature/MessageInput/MessageInput'

import io from 'socket.io-client'

class App extends Component {
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
      <div class="container-fluid" className="App">
        <div class="row aware-container">
          <div class="col-12">
            <NavBar activeRoom={this.state.chatTitle}/>
          </div>

          <div class="col-2 pr-0">
            <ChatSelector selectRoom={selectRoom}/>
          </div>

          <div class="col-10 aware-column p-0">
            <ActivityPanel />
            <ChatWindow messages={this.state.messages} name={this.state.name} />
            <MessageInput sendMessage={sendMessage} name={this.state.name}/>
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

export default App;
