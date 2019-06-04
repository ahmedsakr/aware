import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import './Landing.css'

import Login from './login/Login'
import Register from './register/Register'

class Landing extends Component {
  constructor() {
    super()

    this.state = {
      component: Login
    }
  }

  render() {
    var Component;
    if (this.state.component === Login) {
      Component = Login;
    } else {
      Component = Register;
    }

    return (
      <div className="container-fluid aware-container">
        <div id="landing-canvas" className="aware-column row">
          <div className="col-3 offset-3">
            <Component socket={this.props.socket} switch = {this.switchView} loadMessenger = {this.props.loadMessenger} setUsername = {this.props.setUsername}/>
          </div>
        </div>
      </div>
    );
  }

  switchView = () => {
    if (this.state.component === Login) {
      this.setState({
        component: Register
      })
    } else {
      this.setState({
        component: Login
      })
    }
  }
}

export default Landing;
