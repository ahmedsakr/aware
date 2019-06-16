import React from 'react';
import verification from '../../shared/verification/user';
import "./Login.css";

import Cookies from 'universal-cookie';
const cookies: Cookies = new Cookies();

type LoginProps = {
    setUsername: (username: string) => void,
    switch: () => void,
    socket: SocketIOClient.Socket 
};

type LoginState = {
    username: string | undefined,
    password: string,
    rememberMe: boolean
};

class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);

        this.state = {
            username: cookies.get('aware-user'),
            password: "",
            rememberMe: cookies.get('aware-user') !== undefined
        }

        this.handleChange = this.handleChange.bind(this);
    }

    login(): void {
        if (!verification.verifyUsername(this.state.username)) {
            alert("Please provide a username between 3 and 32 characters.");
            return;
        }

        if (!verification.verifyPassword(this.state.password)) {
            alert("Please provide a password between 8 and 128 characters.");
            return;
        }

        if (this.state.rememberMe) {
            cookies.set('aware-user', this.state.username, {path: '/'});
        } else {
            cookies.remove('aware-user', {path: '/'})
        }

        this.props.setUsername(this.state.username as string);
        this.props.socket.emit('login', this.state.username, this.state.password);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        let value: string | boolean =
            event.type === 'checkbox' ? event.target.checked : event.target.value;

        this.setState({
            [event.target.name]: value
        } as any); 
    }

    render() {
        return(
            <div id="login">
                <h2 id="welcome-message">Welcome back to Aware</h2>
                <h4>Login now to gain access</h4>
                <div className="container">
                    <label id="login-username">Username</label>
                    <input
                        className="landing-textfield"
                        name="username"
                        type="text"
                        value={this.state.username}
                        onChange={this.handleChange} />

                    <label id="login-password">Password</label>
                    <input
                        className="landing-textfield"
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange} />

                    <div id="checkbox-forgot">
                        <label>
                            <input
                                type="checkbox"
                                name="rememberMe"
                                onChange={this.handleChange}
                                checked={this.state.rememberMe} />
                            &nbsp; Remember me
                            </label>
                        <span id="forgot-password">Forgot password?</span>
                    </div>

                    <button type="submit" onClick={() => { this.login() }}>Login</button>

                    <label id="login-register">Don't have an account? <span onClick={() => this.props.switch()}>register now!</span></label>
                </div>  
            </div>
        );
    }
}

export default Login;