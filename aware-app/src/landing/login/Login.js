import React, { Component } from 'react';
import "./Login.css";

class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: ""
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.socket.on('login-request', (result) => {
            if (result) {
                this.props.setUsername(this.state.username);
                this.props.loadMessenger();
            } else {
                alert("Invalid username or password.");
            }
        })
    }

    login() {
        if (this.state.username.length === 0) {
            alert("No username provided!");
            return;
        }

        if (this.state.password.length === 0) {
            alert("No password provided!");
            return;
        }

        this.props.socket.emit('login', this.state.username, this.state.password);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        return(
            <div id="login">
                <h2 id="welcome-message">Welcome back to Aware</h2>
                <h4>Login now to gain access</h4>
                    <div class="container">
                        <label id="login-username">Username</label>
                        <input
                            class="landing-textfield"
                            name="username"
                            type="text"
                            value={this.state.username}
                            onChange={this.handleChange} />

                        <label id="login-password">Password</label>
                        <input
                            class="landing-textfield"
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange} />

                        <label><span>Forgot password?</span></label>

                        <button type="submit" onClick={() => {this.login()}}>Login</button>

                        <label id="login-register">Don't have an account? <span onClick={() => this.props.switch()}>register now!</span></label>
                    </div>  
                
            </div>
        );
    }
}

export default Login;