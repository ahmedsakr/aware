import React, {Component} from 'react';
import NavBarLink, {NavBarLogo, NavBarTitle} from './NavBarItem'
import './NavBar.css';

class NavBar extends Component {
  render() {
    return (
      <div id="navigation-menu">
        <NavBarLogo/>
        <NavBarLink active="false" icon="fa fa-home" name="Home" />
        <NavBarLink active="true" icon="fa fa-comments" name="Messenger" />
        <NavBarLink active="false" icon="fa fa-bars" name="Forum" />
        <NavBarTitle title="SYSC 2100 - Course Discussion"/>
        <NavBarLink className="offset-2" active="false" icon="fa fa-cogs" name="Settings" />
        <NavBarLink active="false" icon="fa fa-user-circle" name="Account" />
      </div>
    );
  }
}

export default NavBar;
