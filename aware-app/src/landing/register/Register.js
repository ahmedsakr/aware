import React, { Component } from 'react';
import './Register.css'

class Register extends Component {
    render() {
        return(
            <div id="register">
                <h2 id="welcome-message">Create an Aware Account</h2>
                <form>
                    <div class="container">
                        <label>Username</label>
                        <input type="text"></input>

                        <label>Password</label>
                        <input type="password"></input>

                        <button type="submit">Login</button>

                        <label>Already have an account? <a href="#">login now!</a></label>
                    </div>
                </form>
            </div>
        );
    }
}

export default Register;
