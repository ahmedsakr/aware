import React, { Component } from 'react';
import "./Login.css";

class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: undefined
        }
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return(
            <div id="login">
                <h2 id="welcome-message">Welcome back to Aware</h2>
                <h4>Login now to gain access</h4>
                <form>
                    <div class="container">
                        <label id="login-username">Username</label>
                        <input class="landing-textfield" type="text" value={this.state.username} onChange={this.handleChange}></input>

                        <label id="login-password">Password</label>

                        <input class="landing-textfield" type="password"></input>

                        <label id="remember-me"><input type="checkbox"/> Remember me</label>
                        <label id="forgot-password"><span>Forgot password?</span></label>

                        <button type="submit" onClick={() => {this.props.setUsername(this.state.username); this.props.loadMessenger()}}>Login</button>

                        <label id="login-register">Don't have an account? <span onClick={() => this.props.switch()}>register now!</span></label>
                    </div>
                </form>
            </div>
        );
    }
    handleChange(event) {
        this.setState({username: event.target.value});
    }
}

export default Login;