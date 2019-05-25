import React, { Component } from 'react';
import './Messenger.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../node_modules/font-awesome/css/font-awesome.min.css'

import NavBar from './NavigationBar/NavBar/NavBar'
import ChatSelector from './ChatSelector/ChatSelector'
import ChatWindow from './ChatFeature/ChatWindow/ChatWindow'
import ActivityPanel from './ChatFeature/ActivityPanel/ActivityPanel'
import MessageInput from './ChatFeature/MessageInput/MessageInput'

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
      <div class="aware-container" className="App">
        <div className="container-fluid aware-container">
          <div id="messenger-root" class="row">
            <div class="col-12 p-0" id="navigation-header">
              <NavBar activeRoom={this.state.chatTitle} />
            </div>

            <div class="col-12 p-0" id="messenger-body">
              <div class="col-2 p-0">
                <ChatSelector selectRoom={selectRoom} />
              </div>

              <div id="messenger" class="col-10 p-0">
                <ActivityPanel />
                <ChatWindow messages={this.state.messages} name={this.state.name} />
                <MessageInput sendMessage={sendMessage} name={this.state.name} />
              </div>
            </div>
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