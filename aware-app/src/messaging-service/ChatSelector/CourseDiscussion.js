import React, {Component} from 'react';
import './CourseDiscussion.scss'
class CourseDiscussion extends Component {
  constructor() {
    super()

    this.state = {
      selected: false
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.selected !== this.state.selected;
  }

  render() {
    const {src, name, updateRoom} = this.props;

    return (
      <div onClick={() => { updateRoom(this); }} class={this.state.selected ? "chat-navigation-item-selected": "chat-navigation-item"}>
        <div class="navbar-item-avatar col-2">
          <img src={process.env.PUBLIC_URL + src} alt={name}/>
        </div>
        <div class="navbar-item-name col-9">
          <p>{name}</p>
        </div>
      </div>
    );
  }
}

export default CourseDiscussion;
