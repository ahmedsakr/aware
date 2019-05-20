import React, { Component } from 'react';

import Messenger from './messaging-service/Messenger'
import Landing from './landing/Landing'

class App extends Component {
    constructor() {
        super()
    
        this.state = {
          component: Landing
        }
    }

    render() {
        var Component = this.state.component;
        
        return (
            <Component loadMessenger = {this.loadMessenger}/>
        );
    }

    loadMessenger = () => {
        this.setState({
            component: Messenger
        })
    }
}

export default App;
