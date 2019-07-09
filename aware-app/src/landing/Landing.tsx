import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import './Landing.scss'

import Login from './login/Login'
import Register from './register/Register'

type LandingProps = {
    loadMessenger: (username: string) => void;
    socket: SocketIOClient.Socket
};

type LandingState = {
    component: string,
    username: string | null
};

export default class Landing extends React.Component<LandingProps, LandingState> {
    constructor(props: LandingProps) {
        super(props)

        this.state = {
            component: "login",
            username: null
        }

        this.setUsername.bind(this);
    }

    componentDidMount(): void {
        if (this.props.socket) {
            this.props.socket.on('login-request', (result: boolean) => {
                if (result) {
                    this.props.loadMessenger(this.state.username as string);
                } else {
                    alert("Invalid username or password.");
                }
            })

            this.props.socket.on('register-request', (result: boolean) => {
                if (result) {
                    alert("Registration successful!");
                    this.switchView();
                } else {
                    alert("Registration failure");
                }
            });
        }
    }

    displayCurrentForm = () => {
        if (this.state.component === "login") {

            return (
                <Login
                    socket={this.props.socket}
                    switch={this.switchView}
                    setUsername={this.setUsername} />
            );

        } else {

            return (
                <Register
                    socket={this.props.socket}
                    switch={this.switchView}
                    setUsername={this.setUsername} />
            );

        }
    }

    switchView = () => {
        let nextForm = this.state.component === "login" ? "register" : "login";
        this.setState({ component: nextForm });
    }

    setUsername = (username: string) => {
        this.setState({
            username: username
        });
    }

    render() {
        return (
            <div className="container-fluid aware-container">
                <div id="landing-canvas" className="aware-column row">
                    <div className="col-3 offset-3">
                        {this.displayCurrentForm()}
                    </div>
                </div>
            </div>
        );
    }
}
