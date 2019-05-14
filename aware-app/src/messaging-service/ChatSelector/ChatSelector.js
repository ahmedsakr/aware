import React, {Component} from 'react';
import CourseDiscussion from './CourseDiscussion'
import './CourseDiscussion.css';
import DirectMessage from './DirectMessage/DirectMessage'


class ChatSelector extends Component {
  render() {
    return (
      <div id="vertical-menu">
        <h3>Course Discussion</h3>
        <CourseDiscussion selectRoom={this.props.selectRoom} room="SYSC2100" src="/messenger-icons/sysc.png" name="sysc 2100" />
        <CourseDiscussion selectRoom={this.props.selectRoom} room="SYSC2004" src="/messenger-icons/sysc.png" name="sysc 2004" />
        <CourseDiscussion selectRoom={this.props.selectRoom} room="SYSC3110" src="/messenger-icons/sysc.png" name="sysc 3110" />
        <CourseDiscussion selectRoom={this.props.selectRoom} room="ELEC2501" src="/messenger-icons/eelc.png" name="elec 2501" />
        <CourseDiscussion selectRoom={this.props.selectRoom} room="MATH2004" src="/messenger-icons/math.png" name="math 2004" />

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
