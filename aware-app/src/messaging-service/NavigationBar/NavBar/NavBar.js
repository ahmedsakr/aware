import React, {Component} from 'react';
import NavBarItem from '../NavBarItem/NavBarItem'
import './NavBar.css';

class NavBar extends Component {
  render() {
    return (
      <div id="vertical-menu" class="row">
        <NavBarItem selectRoom={this.props.selectRoom} room="SYSC2100" src="/icons8-monitor-64.png" name="sysc 2100" />
        <NavBarItem selectRoom={this.props.selectRoom} room="SYSC2003" src="/icons8-monitor-64.png" name="sysc 2003" />
        <NavBarItem selectRoom={this.props.selectRoom} room="SYSC2004" src="/icons8-monitor-64.png" name="sysc 2004" />
        <NavBarItem selectRoom={this.props.selectRoom} room="ELEC2501" src="/icons8-electronics-50.png" name="elec 2501" />
        <NavBarItem selectRoom={this.props.selectRoom} room="ELEC2607" src="/icons8-electronics-50.png" name="elec 2607" />
      </div>
    );
  }
}

export default NavBar;
