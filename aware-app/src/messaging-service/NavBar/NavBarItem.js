import React, {Component} from 'react';
import './NavBar.css'
class NavBarLink extends Component {
  render() {
    const {className, icon, name} = this.props;

    return (
      <a href="/" class={className + " navigation-menu-link"}>
        <span class={icon} aria-hidden="true"></span>
        <p>{name}</p>
      </a>
    );
  }
}

export default NavBarLink;

class NavBarLogo extends Component {
  render() {
    const {className} = this.props;

    return (
      <div class={className + " navigation-menu-logo"}>
        <p>AWARE</p>
      </div>
    );
  }
}

class NavBarTitle extends Component {
  render() {

    const {className, title} = this.props;

    return (
      <div class={className + " navigation-menu-title"}>
        <p>{title}</p>
      </div>
    );
  }
}

export {
  NavBarLogo,
  NavBarTitle
}