import React, {Component} from 'react';
import NavBarItem from './NavBarItem'
import './NavBar.css';

class NavBar extends Component {
  render() {
    return (
      <div id="vertical-menu" class="row">
        <NavBarItem src="/icons8-monitor-64.png" name="sysc 2100" />
        <NavBarItem src="/icons8-monitor-64.png" name="sysc 2003" />
        <NavBarItem src="/icons8-monitor-64.png" name="sysc 2004" />
        <NavBarItem src="/icons8-electronics-50.png" name="elec 2501" />
        <NavBarItem src="/icons8-electronics-50.png" name="elec 2607" />
      </div>
    );
  }
}

export default NavBar;
