import React, { Component } from 'react';
import io from 'socket.io-client';

class App extends Component {

  render() {
    var socket = io();
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
