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
                        <input type="text"></input>

                        <label id="login-password">Password</label>
                        <input type="password"></input>

                        <label><a href="#">Forgot password?</a></label>

                        <button type="submit">Login</button>

                        <label id="login-register">Don't have an account? <a href="#" onClick={() => this.props.switch()}>register now!</a></label>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;