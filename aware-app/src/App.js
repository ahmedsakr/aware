import React, { Component } from 'react';
import './style/App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import NavBar from './messaging-service/NavBar/NavBar'
import ChatWindow from './messaging-service/ChatFeature/ChatWindow'
import ChatTitle from './messaging-service/ChatFeature/ChatTitle'
import DirectMessages from './messaging-service/DirectMessage/DirectMessages'
import MessageInput from './messaging-service/ChatFeature/MessageInput'

class App extends Component {
  render() {
    return (
      <div class="container-fluid" className="App">
        <div class="row">
          <div class="col-1">
            <NavBar />
          </div>

          <div class="col-8">
            <ChatTitle course="SYSC 2100" />
            <ChatWindow />
            <MessageInput />
          </div>

          <div class="col-3">
            <DirectMessages />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
