import React from 'react';
import * as user from '../../shared/verification/user'
import "./Login.scss";

import Cookies from 'universal-cookie';
const cookies: Cookies = new Cookies();

type LoginProps = {
    setUsername: (username: string) => void,
    switch: () => void,
    socket: SocketIOClient.Socket 
};

type LoginState = {
    username: user.AccountField,
    password: user.AccountField,
    rememberMe: boolean
};

export default class Login extends React.Component<LoginProps, LoginState> {
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
        let validation: user.FieldValidationResult = user.verifyUsername(this.state.username);
        if (validation != user.FieldValidationResult.FIELD_VALIDATED) {
            alert(user.getValidationError(user.AccountFields.USERNAME, validation));
            return;
        }
        
        validation = user.verifyPassword(this.state.password);
        if (validation != user.FieldValidationResult.FIELD_VALIDATED) {
            alert(user.getValidationError(user.AccountFields.PASSWORD, validation));
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

    handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        let value: string | boolean =
            event.type === 'checkbox' ? event.target.checked : event.target.value;

        this.setState({
            [event.target.name]: value
        } as any); 
    }

    render() {
        return(
            <form id="test-form">
                <h2 className="sr-only">Login Form</h2>
                <div className="illustration"><i className="icon ion-ios-navigate"></i></div>
                <div className="form-group">
                    <input 
                        className="form-control" 
                        type="text" 
                        name="username" 
                        placeholder="Username" 
                        value={this.state.username as string} 
                        onChange={this.handleChange}>
                    </input>
                </div>
                <div className="form-group">
                    <input 
                        className="form-control" 
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password as string}
                        onChange={this.handleChange}>
                    </input>
                </div>
                <div className="form-group">
                    <button
                        className="btn btn-primary btn-block" 
                        type="button" 
                        onClick={() => { this.login() }}>Log In
                    </button>
                </div>
                <div className="form-check">
                    <input 
                        className="form-check-input" 
                        type="checkbox" 
                        name="rememberMe"
                        onChange={this.handleChange}
                        checked={this.state.rememberMe}>
                    </input>
                    <label className="form-check-label">Remember me</label>
                </div>
            </form>
        );
    }
}