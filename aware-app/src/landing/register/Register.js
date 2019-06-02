import React, { Component } from 'react';
import verification from '../../shared/verification/user';
import './Register.css'

class Register extends Component {

    constructor() {
        super();

        this.state = {
            username: "",
            password: "",
            confirmPassword: ""
        };

        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.props.socket.on('register-request', (result) => {
            if (result) {
                alert("Registration successful!");
                this.props.switch();
            } else {
                alert("Registration failure");
            }
        });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    register() {
        if (!verification.verifyUsername(this.state.username)) {
            alert("Please provide a username between 3 and 32 characters.");
            return;
        }

        if (!verification.verifyPassword(this.state.password)) {
            alert("Please provide a password between 8 and 128 characters.");
            return;
        }

        if (this.state.password === this.state.confirmPassword) {
            this.props.socket.emit('register', this.state.username, this.state.password);
        } else {
            alert("Passwords do not match!");
        }
    }

    render() {
        return(
            <div id="register">
                <h2 id="welcome-message">Create an Aware Account</h2>
                    <div class="container">
                        <label id="register-username">Username</label>
                        <input
                            class="landing-textfield"
                            name="username"
                            type="text"
                            value={this.state.username}
                            onChange={this.handleChange} />

                        <label id="register-password">Password</label>
                        <input
                            class="landing-textfield"
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange} />

                        <label id="register-confirm">Confirm Password</label>
                        <input
                            class="landing-textfield"
                            name="confirmPassword"
                            type="password"
                            value={this.state.confirmPassword}
                            onChange={this.handleChange} />

                        <button type="submit" onClick={() => {this.register()}}>Register</button>
                        <label id="register-login">Already have an account? <span onClick={() => this.props.switch()}>login now!</span></label>
                    </div>
            </div>
        );
    }
}

export default Register;
