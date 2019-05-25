import React, { Component } from 'react';

import Messenger from './messaging-service/Messenger'
import Landing from './landing/Landing'

class App extends Component {
    constructor() {
        super()
    
        this.state = {
          component: Landing,
          username: undefined
        }
    }

    render() {
        var Component = this.state.component;
        
        return (
            <Component userFunction = {this.setUsername} name = {this.state.username} loadMessenger = {this.loadMessenger}/>
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

    getUsername = () => {
        return this.state.username;
    }
}

export default App;
