import React from 'react';
import CourseDiscussion from './CourseDiscussion'
import Courses from './Courses/Courses'
import './ChatSelector.scss'
import './CourseDiscussion.scss'
import DirectMessage from './DirectMessage/DirectMessage'
import DirectMessages from './DirectMessages/DirectMessages'

export type Room = React.Component<CourseDiscussion['props'] | DirectMessage['props']> | null
type ChatSelectorProps = {
    requestRoom: (roomName: string, username: string) => void,
    socket: SocketIOClient.Socket,
    username: string
};

type ChatSelectorState = {
    selectedRoom: Room
};

export default class ChatSelector extends React.Component<ChatSelectorProps, ChatSelectorState> {

    constructor(props: ChatSelectorProps) {
        super(props)

        this.state = {
            selectedRoom: null
        };
    }

    /**
     * Requests a room change from the server and updates the highlighted
     * room to reflect the new room.
     *
     * @param room A new course or direct message chosen by the user
     */
    selectChat(room: Room): void {
        if (this.state.selectedRoom !== room) {

            // De-select the joined room in preparation for joining the new room.
            if (this.state.selectedRoom) {
                this.state.selectedRoom.setState({ selected: false });
            }

            this.setState({
                selectedRoom: room
            }, () => {
                if (this.state.selectedRoom) {
                    this.state.selectedRoom.setState({ selected: true });

                    const { room, name } = this.state.selectedRoom.props;
                    this.props.requestRoom(room, name);                    
                }
            });
        }
    }

    /**
     * The ChatSelector should never have to update; instead, it just maintains the
     * current selected room state without a need for updating.
     */
    shouldComponentUpdate(nextProps: ChatSelectorProps, nextState: ChatSelectorState): boolean {
        return false;
    }

    render(): JSX.Element {

        return (
            <div id="vertical-menu">
                <h3>Course Discussion</h3>

                <Courses
                    socket={this.props.socket}
                    username={this.props.username}
                    selectCourse={this.selectChat.bind(this)} />

                <hr className="chat-selector-line-break" />

                <h3>Direct Messages</h3>

                <DirectMessages 
                    selectDirectMessage={this.selectChat.bind(this)}/>
            </div>
        );
    }
}
