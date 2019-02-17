import React, { Component } from 'react';
import './style/App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import ChatSelector from './messaging-service/ChatSelector/ChatSelector'
import ChatWindow from './messaging-service/ChatFeature/ChatWindow'
import ChatTitle from './messaging-service/ChatFeature/ChatTitle'
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
    this.state = {
      messages: TEST_DATA
    }
  }

  render() {
    const { sendMessage, state } = this;
    return (
      <div class="container-fluid" className="App">
        <div class="row">
          <div class="col-2 pr-0">
            <div class="aware-container">
              <ChatSelector />
            </div>
          </div>

          <div class="col-10 aware-column p-0">
            <ChatTitle course="SYSC 2100" />
            <ChatWindow messages={this.state.messages} />
            <MessageInput sendMessage={ sendMessage } />
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
