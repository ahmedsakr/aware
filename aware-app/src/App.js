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

    loadMessenger = (rememberMe) => {
        this.setState({
            component: Messenger
        }, function () {
            if (rememberMe) {
                cookies.set('aware-user', this.state.username, {path: '/'});
            } else {
                cookies.remove('aware-user', {path: '/'})
            }  
        }); 
    }

    setUsername = (value) => {
        this.setState({
            username: value
        });        
    }
}

export default App;
