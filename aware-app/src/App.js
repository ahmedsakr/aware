import React, { Component } from 'react';

import Messenger from './messaging-service/Messenger'
import Landing from './landing/Landing'

import Cookies from 'universal-cookie';
const cookies = new Cookies();

class App extends Component {
    constructor() {
        super()
    
        this.state = {
          component: Landing,
          username: null
        }
    }

    render() {
        var Component = this.state.component;
        
        return (
            <Component setUsername = {this.setUsername} name = {this.state.username} loadMessenger = {this.loadMessenger}/>
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
        }, cookies.set('aware-user', value, { path: '/' }));        
    }
}

export default App;
