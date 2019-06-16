import 'babel-polyfill'
import React, { Component } from 'react';
import io from 'socket.io-client'

import Messenger from './messaging-service/Messenger'
import Landing from './landing/Landing'

type AppState = {
    socket: SocketIOClient.Socket,
    component: string,
    username: string | null
};

export default class App extends Component<{}, AppState> {
    constructor(props: any) {
        super(props);

        this.state = {
          socket: io(),
          component: "landing",
          username: null
        };
    }

    shouldComponentUpdate(nextProps: any, nextState: any): boolean {
        return this.state.component !== nextState.component;
    }

    loadMessenger = (username: string): void => {
        this.setState({
            component: "messenger",
            username
        }); 
    }

    render(): JSX.Element {
        if (this.state.component === "landing") {
            return (
                <Landing
                    socket={this.state.socket}
                    loadMessenger = {this.loadMessenger} />
            );     
        } else {
            return (
                <Messenger
                    socket={this.state.socket}
                    username={this.state.username as string} />
            );
        }
    }
}
