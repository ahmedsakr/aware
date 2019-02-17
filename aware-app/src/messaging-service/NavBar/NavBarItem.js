import React, {Component} from 'react';
import './NavBar.css'
class NavBarLink extends Component {
  render() {
    const {active, icon, name} = this.props;
    var activeText = "";
    if (active === "true")  {
      activeText = "navigation-menu-link-active";
    }

    return (
      <div class={"col-sm-1 navigation-menu-link " + activeText}>
        <span class={icon} aria-hidden="true"></span>
        <p>{name}</p>
      </div>
    );
  }
}

export default NavBarLink;

class NavBarLogo extends Component {
  render() {
    return (
      <div class="col-sm-2 navigation-menu-logo">
        <p>AWARE</p>
      </div>
    );
  }
}

class NavBarTitle extends Component {
  render() {

    const {title} = this.props;

    return (
      <div class="col-sm-5 navigation-menu-title">
        <p>{title}</p>
      </div>
    );
  }
}

export {
  NavBarLogo,
  NavBarTitle
}