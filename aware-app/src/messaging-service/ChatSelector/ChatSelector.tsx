import React from 'react';
import CourseDiscussion from './CourseDiscussion'
import Courses from './Courses/Courses'
import './CourseDiscussion.scss';
import DirectMessage from './DirectMessage/DirectMessage'
import DirectMessages from './DirectMessages/DirectMessages'

export type Room = React.Component<CourseDiscussion['props'] | DirectMessage['props']> | null
type ChatSelectorProps = {
    requestRoom: (roomName: string, username: string) => void,
    socket: SocketIOClient.Socket,
    username: string
};

type ChatSelectorState = {
    rooms: Room[],
    selectedRoom: Room
};

export default class ChatSelector extends React.Component<ChatSelectorProps, ChatSelectorState> {
    constructor(props: ChatSelectorProps) {
        super(props)

        this.state = {
            rooms: [],
            selectedRoom: null
        };

        this.selectChat.bind(this);
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

    selectChat(room: Room): void {
        this.setState({
            selectedRoom: room
        });
    }

    componentDidUpdate(prevProps: ChatSelectorProps, prevState: ChatSelectorState): void {

        if (this.state.selectedRoom) {
            this.props.requestRoom(this.state.selectedRoom.props.name, this.state.selectedRoom.props.name);
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

                <Courses
                    selectCourse={this.selectChat} />

                <hr></hr>

                <DirectMessages
                    selectDirectMessage={this.selectChat} />

            </div>
        );
    }
}
