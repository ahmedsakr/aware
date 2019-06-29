import React from 'react';
import {verifyPassword, verifyUsername, AccountField, FieldValidationResult} from '../../shared/verification/user'
import './Register.css'

type RegisterProps = {
    setUsername: (username: string) => void,
    switch: () => void,
    socket: SocketIOClient.Socket 
};

type RegisterState = {
    username: AccountField,
    password: AccountField,
    confirmPassword: AccountField
};

export default class Register extends React.Component<RegisterProps, RegisterState> {

    constructor(props: RegisterProps) {
        super(props);

        this.state = {
            username: "",
            password: "",
            confirmPassword: ""
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            [event.target.name]: event.target.value
        } as any);
    }

    register(): void {
        if (verifyUsername(this.state.username) != FieldValidationResult.FIELD_VALIDATED) {
            alert("Please provide a username between 3 and 32 characters.");
            return;
        }

        if (verifyPassword(this.state.password) != FieldValidationResult.FIELD_VALIDATED) {
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
                    <div className="container">
                        <label id="register-username">Username</label>
                        <input
                            className="landing-textfield"
                            name="username"
                            type="text"
                            value={this.state.username as string}
                            onChange={this.handleChange} />

                        <label id="register-password">Password</label>
                        <input
                            className="landing-textfield"
                            name="password"
                            type="password"
                            value={this.state.password as string}
                            onChange={this.handleChange} />

                        <label id="register-confirm">Confirm Password</label>
                        <input
                            className="landing-textfield"
                            name="confirmPassword"
                            type="password"
                            value={this.state.confirmPassword as string}
                            onChange={this.handleChange} />

                        <button type="submit" onClick={() => {this.register()}}>Register</button>
                        <label id="register-login">Already have an account? <span onClick={() => this.props.switch()}>login now!</span></label>
                    </div>
            </div>
        );
    }
}
