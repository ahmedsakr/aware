import React, { Component } from 'react';
import './Register.css'

class Register extends Component {
    render() {
        return(
            <div id="register">
                <h2 id="welcome-message">Create an Aware Account</h2>
                <form>
                    <div class="container">
                        <label id="register-username">Username</label>
                        <input id="landing-textfield" type="text"></input>

                        <label id="register-password">Password</label>
                        <input id="landing-textfield" type="password"></input>

                        <label id="register-confirm">Confirm Password</label>
                        <input id="landing-textfield" type="password"></input>

                        <button type="submit">Register</button>

                        <label id="register-login">Already have an account? <a href="#" onClick={() => this.props.switch()}>login now!</a></label>
                    </div>
                </form>
            </div>
        );
    }
}

export default Register;
