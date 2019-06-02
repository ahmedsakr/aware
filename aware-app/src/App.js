import React, { Component } from 'react';
import io from 'socket.io-client'

import Messenger from './messaging-service/Messenger'
import Landing from './landing/Landing'

class App extends Component {
    constructor() {
        super()
    
        this.state = {
          component: Landing,
          socket: io(),
          username: null
        }
    }

    render() {
        var Component = this.state.component;
        
        return (
            <Component socket={this.state.socket} setUsername = {this.setUsername} name = {this.state.username} loadMessenger = {this.loadMessenger}/>
        );
    }

    loadMessenger = () => {
        this.setState({
            component: Messenger
        })
    }

    setUsername = (value) => {
        this.setState({
            username: value
        })
    }
}

export default App;
