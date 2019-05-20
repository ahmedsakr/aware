import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import './Landing.css'

import Login from './login/Login'
import Register from './register/Register'

class Landing extends Component {
  constructor() {
    super()

    this.state = {
      component: Register
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
          <div id="test-flex" className="col-3 offset-3">
            <Component switch = {this.switchView} loadMessenger = {this.props.loadMessenger}/>
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
