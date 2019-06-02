import React, { Component } from 'react';
import "./Login.css";

class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: null,
            password: null
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.socket.on('login-request', (result) => {
            if (result) {
                this.props.setUsername(this.state.username);
                this.props.loadMessenger();
            } else {
                alert("Response from server: Invalid credentials");
            }
        })
    }

    render() {
        return(
            <div id="login">
                <h2 id="welcome-message">Welcome back to Aware</h2>
                <h4>Login now to gain access</h4>
                
                    <div class="container">
                        <label id="login-username">Username</label>
                        <input class="landing-textfield" type="text" value={this.state.username} onChange={this.handleChange}></input>

                        <label id="login-password">Password</label>
                        <input class="landing-textfield" type="password"></input>

                        <label><span>Forgot password?</span></label>

                        <button type="subit" onClick={() => {this.tryLogin()}}>Login</button>

                        <label id="login-register">Don't have an account? <span onClick={() => this.props.switch()}>register now!</span></label>
                    </div>  
                
            </div>
        );
    }

    tryLogin() {
        this.props.socket.emit('login', this.state.username, "password");
    }

    handleChange(event) {
        this.setState({username: event.target.value});
    }
}

export default Login;