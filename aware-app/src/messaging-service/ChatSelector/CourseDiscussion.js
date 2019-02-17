import React, {Component} from 'react';
import './CourseDiscussion.css'
class CourseDiscussion extends Component {
  render() {
    const {src, name} = this.props;

    return (
      <a href="/" class="chat-navigation-item">
        <div class="navbar-item-avatar col-2">
          <img src={process.env.PUBLIC_URL + src} alt={name}/>
        </div>
        <div class="navbar-item-name col-9">
          <p>{name.toUpperCase()}</p>
        </div>
      </a>
    );
  }
}

export default CourseDiscussion;
