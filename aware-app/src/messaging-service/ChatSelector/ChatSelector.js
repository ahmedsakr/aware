import React, {Component} from 'react';
import CourseDiscussion from './CourseDiscussion'
import './CourseDiscussion.css';
import DirectMessage from './DirectMessage'


class ChatSelector extends Component {
  render() {
    return (
      <div id="vertical-menu">
        <h3>Course Discussion</h3>
        <CourseDiscussion src="/messenger-icons/sysc.png" name="sysc 2100" />
        <CourseDiscussion src="/messenger-icons/sysc.png" name="sysc 2004" />
        <CourseDiscussion src="/messenger-icons/sysc.png" name="sysc 3110" />
        <CourseDiscussion src="/messenger-icons/eelc.png" name="elec 2501" />
        <CourseDiscussion src="/messenger-icons/math.png" name="math 2004" />

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
