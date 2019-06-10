import 'babel-polyfill'
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

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.component !== nextState.component;
    }

    render() {
        if (this.state.component === Landing) {
            return (
                <Landing
                    socket={this.state.socket}
                    loadMessenger = {this.loadMessenger} />
            );     
        } else {
            return (
                <Messenger
                    socket={this.state.socket}
                    username={this.state.username} />
            );
        }
    }

    loadMessenger = (username) => {
        this.setState({
            component: Messenger,
            username: username
        }); 
    }
}

export default App;
