import React, {Component} from 'react';
import CourseDiscussion from './CourseDiscussion'
import './CourseDiscussion.css';
import DirectMessage from './DirectMessage/DirectMessage'


class ChatSelector extends Component {
  constructor() {
    super()
    this.state = {
      selectedRoom: null
    }
  }

  updateSelectedRoom(room) {
    this.setState({
      selectedRoom: room
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.selectedRoom !== nextState.selectedRoom;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.selectRoom(this.state.selectedRoom.props.name);
    this.state.selectedRoom.setState({ selected: true });
    
    if (prevState.selectedRoom != null) {
      prevState.selectedRoom.setState({ selected: false });
    }
  }

  render() {

    return (
      <div id="vertical-menu">
        <h3>Course Discussion</h3>
        <CourseDiscussion updateRoom={this.updateSelectedRoom.bind(this)} room="SYSC2100" src="/messenger-icons/sysc.png" name="SYSC 2100" />
        <CourseDiscussion updateRoom={this.updateSelectedRoom.bind(this)} room="SYSC2004" src="/messenger-icons/sysc.png" name="SYSC 2004" />
        <CourseDiscussion updateRoom={this.updateSelectedRoom.bind(this)} room="SYSC3110" src="/messenger-icons/sysc.png" name="SYSC 3110" />
        <CourseDiscussion updateRoom={this.updateSelectedRoom.bind(this)} room="ELEC2501" src="/messenger-icons/eelc.png" name="ELEC 2501" />
        <CourseDiscussion updateRoom={this.updateSelectedRoom.bind(this)} room="MATH2004" src="/messenger-icons/math.png" name="MATH 2004" />

        <hr></hr>

        <h3>Direct Messages</h3>
        <DirectMessage src="/messenger-icons/account.png" name="Josh Campitelli" />
        <DirectMessage src="/messenger-icons/account.png" name="Ahmed Sakr" />
        <DirectMessage src="/messenger-icons/account.png" name="Arsalan Sadiq" />

      </div>
    );
  }
}

export default ChatSelector;
