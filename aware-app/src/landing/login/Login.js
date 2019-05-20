import React, { Component } from 'react';
import "./Login.css";

class Login extends Component {
    render() {
        return(
            <div id="login">
                <h2 id="welcome-message">Welcome back to Aware</h2>
                <h4>Login now to gain access</h4>
                <form>
                    <div class="container">
                        <label id="login-username">Username</label>
                        <input class="landing-textfield" type="text"></input>

                        <label id="login-password">Password</label>
                        <input class="landing-textfield" type="password"></input>

                        <label><span>Forgot password?</span></label>

                        <button type="submit" onClick={() => this.props.loadMessenger()}>Login</button>

                        <label id="login-register">Don't have an account? <span onClick={() => this.props.switch()}>register now!</span></label>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;