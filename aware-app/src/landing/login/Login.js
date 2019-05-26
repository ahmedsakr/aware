import React, { Component } from 'react';
import "./Login.css";

import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: cookies.get('aware-user'),
            rememberMe: false
        }
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    render() {
        return(
            <div id="login">
                <h2 id="welcome-message">Welcome back to Aware</h2>
                <h4>Login now to gain access</h4>
                <form>
                    <div class="container">
                        <label id="login-username">Username</label>
                        <input class="landing-textfield" type="text" value={this.state.username} onChange={this.handleUsernameChange}></input>

                        <label id="login-password">Password</label>

                        <input class="landing-textfield" type="password"></input>

                        <label id="remember-me">
                            <input type="checkbox" onChange={this.handleCheckboxChange}/> 
                            Remember me
                        </label>
                        <label id="forgot-password"><span>Forgot password?</span></label>

                        <button type="submit" onClick={() => {this.props.setUsername(this.state.username); this.props.loadMessenger(this.state.rememberMe)}}>Login</button>

                        <label id="login-register">Don't have an account? <span onClick={() => this.props.switch()}>register now!</span></label>
                    </div>
                </form>
            </div>
        );
    }

    handleUsernameChange = (event) => {
        this.setState({username: event.target.value});
    }

    handleCheckboxChange = (event) => {
        this.setState({ rememberMe: event.target.checked});
    }
}

export default Login;