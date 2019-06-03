import React, {Component} from 'react';
import CourseDiscussion from './CourseDiscussion'
import './CourseDiscussion.css';
import DirectMessage from './DirectMessage/DirectMessage'

class ChatSelector extends Component {
  constructor() {
    super()
    
    this.state = {
      rooms: [],
      selectedRoom: null
    };
  }

  componentWillMount() {

    // Retrieve all rooms that the user is subscribed to.
    this.props.socket.emit('get-rooms', this.props.username);

    // Listen for any updates in subscribed rooms for this user.
    this.props.socket.on('user-rooms', (rooms) => {
      console.log(rooms);
      this.setState({
        rooms: rooms
      });
    });

  }

  updateSelectedRoom(room) {
    this.setState({
      selectedRoom: room
    });
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return  (this.state.rooms !== nextState.rooms)
            || (this.state.selectedRoom !== nextState.selectedRoom);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    
    if (this.state.selectedRoom !== null) {
      this.props.selectRoom(this.state.selectedRoom.props.name);
      this.state.selectedRoom.setState({ selected: true });
    }
 
    if (prevState.selectedRoom != null) {
      prevState.selectedRoom.setState({ selected: false });
    }
  }

  render() {

    return (
      <div id="vertical-menu">
        <h3>Course Discussion</h3>

        {
          this.state.rooms.map(room => {
            return (
              <CourseDiscussion
                updateRoom={this.updateSelectedRoom.bind(this)}
                room={room.group_id}
                src="/messenger-icons/sysc.png"
                name={room.name} />
            )
          })
        }

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
