import React from 'react';
import * as user from '../../shared/verification/user'
import './Register.scss'

type RegisterProps = {
    setUsername: (username: string) => void,
    switch: () => void,
    socket: SocketIOClient.Socket 
};

type RegisterState = {
    username: user.AccountField,
    password: user.AccountField,
    confirmPassword: user.AccountField
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

        if (this.state.password === this.state.confirmPassword) {
            this.props.socket.emit('register', this.state.username, this.state.password);
        } else {
            alert("Passwords do not match!");
        }
    }

    render() {
        return(
            <form id="test-form">
                <h2 className="sr-only">Register Form</h2>
                <div className="illustration"><img src={process.env.PUBLIC_URL + 'temp-logo.jpg'}></img></div>
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
                    <input 
                        className="form-control" 
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={this.state.confirmPassword as string}
                        onChange={this.handleChange}>
                    </input>
                </div>
                <div className="form-group">
                    <button
                        className="btn btn-primary btn-block" 
                        type="button" 
                        onClick={() => { this.register() }}>Register
                    </button>
                </div>
            </form>
        );
    }
}
