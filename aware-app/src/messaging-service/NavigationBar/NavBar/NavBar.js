import React, {Component} from 'react';
import NavBarLink, {NavBarLogo, NavBarTitle} from '../NavBarItem/NavBarItem'
import './NavBar.css';

class NavBar extends Component {
  render() {
    return (
      <div id="navigation-menu">
        <NavBarLogo className="col-lg-2 col-md-2 col-sm-2 p-0"/>
        <div class="col-lg-3 col-md-4 col-sm-5 p-0 navigation-menu-group">
          <NavBarLink className="col-lg-3 col-md-4 col-sm-4 p-0" icon="fa fa-home" name="Home" />
          <NavBarLink className="col-lg-5 col-md-4 col-sm-4 navigation-menu-link-active p-0" icon="fa fa-comments" name="Messenger" />
          <NavBarLink className="col-lg-4 col-md-4 col-sm-4 p-0" icon="fa fa-bars" name="Forum" />
        </div>

        <NavBarTitle className="col-lg-5 col-md-4 col-sm-2 p-0" title={this.props.activeRoom}/>
        <div class="col-lg-2 col-md-2 col-sm-3 p-0 navigation-menu-group">
          <NavBarLink className="col-lg-6 col-md-6 col-sm-6 p-0" icon="fa fa-cogs" name="Settings" />
          <NavBarLink className="col-lg-6 col-md-6 col-sm-6 p-0" icon="fa fa-user-circle" name="Account" />
        </div>
      </div>
    );
  }
}

export default NavBar;
