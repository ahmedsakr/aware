import React from 'react';
import CourseDiscussion from './CourseDiscussion'
import './CourseDiscussion.css';
import DirectMessage from './DirectMessage/DirectMessage'

interface Room {
  group_id: string,
  icon: string,
  name: string
};

type ChatSelectorProps = {
  selectRoom: (roomName: string, username: string) => void,
  socket: SocketIOClient.Socket,
  username: string
};

type ChatSelectorState = {
  rooms: Room[],
  selectedRoom: CourseDiscussion | null
};

export default class ChatSelector extends React.Component<ChatSelectorProps, ChatSelectorState> {
  constructor(props: ChatSelectorProps) {
    super(props)
    
    this.state = {
      rooms: [],
      selectedRoom: null
    };
  }

  componentWillMount(): void {
    if (this.props.socket) {

      // Retrieve all rooms that the user is subscribed to.
      this.props.socket.emit('get-rooms', this.props.username);

      // Listen for any updates in subscribed rooms for this user.
      this.props.socket.on('user-rooms', (rooms: Room[]) => {
        this.setState({
          rooms: rooms
        });
      });
    }
  }

  updateSelectedRoom(room: CourseDiscussion): void {
    this.setState({
      selectedRoom: room
    });
  }

  shouldComponentUpdate(nextProps: ChatSelectorProps, nextState: ChatSelectorState): boolean {
    return  (this.state.rooms !== nextState.rooms) || (this.state.selectedRoom !== nextState.selectedRoom);
  }

  componentDidUpdate(prevProps: ChatSelectorProps, prevState: ChatSelectorState): void {
    
    if (this.state.selectedRoom) {
      this.props.selectRoom(this.state.selectedRoom.props.room, this.state.selectedRoom.props.name);
      this.state.selectedRoom.setState({ selected: true });
    }
 
    if (prevState.selectedRoom) {
      prevState.selectedRoom.setState({ selected: false });
    }
  }

  render(): JSX.Element {

    return (
      <div id="vertical-menu">
        <h3>Course Discussion</h3>

        {
          this.state.rooms.map((room: Room) => {
            return (
              <CourseDiscussion
                updateRoom={this.updateSelectedRoom.bind(this)}
                room={room.group_id}
                src={"/messenger-icons/" + room.icon}
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
