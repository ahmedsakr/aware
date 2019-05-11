import React, {Component} from 'react';
import '../NavBar/NavBar.css';

class NavBarItem extends Component {
  render() {
    const {src, name} = this.props;

    return (
      <div onClick={() => { this.props.selectRoom(this.props.room)}} class="chat-navigation-item">
          <img src={process.env.PUBLIC_URL + src} alt={name}/>
          <p>{name.toUpperCase()}</p>
      </div>
    );
  }
}

export default NavBarItem;
