import React, { Component } from 'react';
import './style/App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import { connection } from 'messaging-service/client'
import NavBar from './messaging-service/NavBar/NavBar'
import ChatWindow from './messaging-service/ChatFeature/ChatWindow'
import ChatTitle from './messaging-service/ChatFeature/ChatTitle'
import DirectMessages from './messaging-service/DirectMessage/DirectMessages'
import MessageInput from './messaging-service/ChatFeature/MessageInput'

const TEST_DATA = [
  {
    studentName: "Ahmed",
    text: "Yeah, I am kinda drunk.",
    timestamp: "December 1, 2018 - 12:22 pm",
    avatar: "/icons8-user-80blue.png"
  },
  {
    studentName: "Josh",
    text: "Same broda.",
    timestamp: "December 1, 2018 - 12:22 pm",
    avatar: "/icons8-user-80blue.png"
  },
  {
    studentName: "Arsalan",
    text: "guys, I am hungry.",
    timestamp: "December 1, 2018 - 12:22 pm",
    avatar: "/icons8-user-80blue.png"
  }
]

class App extends Component {
  constructor() {
    super()
    let socket = connection();
    this.state = {
      messages: TEST_DATA
    }
    socket.on('chat message', function(msg) {
      this.setState({
        messages: this.state.messages.concat([msg])
      })
    });
  }

  render() {
    const { sendMessage } = this;
    return (
      <div class="container-fluid" className="App">
        <div class="row aware-container">
          <div class="col-1 aware-column">
            <NavBar />
          </div>

          <div class="col-8 aware-column">
            <ChatTitle course="SYSC 2100" />
            <ChatWindow messages={this.state.messages} />
            <MessageInput sendMessage={ sendMessage } />
          </div>

          <div class="col-3 aware-column">
            <DirectMessages />
          </div>
        </div>
      </div>
    );
  }

  sendMessage = (message) => {
    console.log('sendMessage', message);
    this.setState({
      messages: this.state.messages.concat([message])
    })
  }
}

export default App;
