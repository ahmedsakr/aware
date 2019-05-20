import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../style/App.css'

import Login from './login/Login'
import Register from './register/Register'

class Landing extends Component {
  render() {
    return (
      <div className="container-fluid aware-container">
        <div id="login-canvas" className="aware-column row">
          <div id="test-flex" className="col-3 offset-3">
            <Login />
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
