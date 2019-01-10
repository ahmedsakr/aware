import React, { Component } from 'react';
import '../style/App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import NavBar from './NavBar'
import ChatWindow from './ChatWindow'
import ChatTitle from './ChatTitle'
import DirectMessages from './DirectMessages'
import MessageInput from './MessageInput'

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