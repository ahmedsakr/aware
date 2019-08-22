import React from 'react';
import Courses from './Courses/Courses'
import './ChatSelector.scss'
import DirectMessages from './DirectMessages/DirectMessages'

type ChatSelectorProps = {
    requestRoom: (roomName: string, username: string) => void,
    socket: SocketIOClient.Socket,
    username: string
};

type ChatSelectorState = {
    selectedRoom: string,
    chatType: ChatType
};

export enum ChatType {
    COURSE_DISCUSSION,
    DIRECT_MESSAGE
}

export default class ChatSelector extends React.Component<ChatSelectorProps, ChatSelectorState> {

    constructor(props: ChatSelectorProps) {
        super(props)

        this.state = {
            selectedRoom: '',
            chatType: ChatType.COURSE_DISCUSSION
        };
    }

    /**
     * Requests a room change from the server and updates the highlighted
     * room to reflect the new room.
     *
     * @param room A new course or direct message chosen by the user
     */
    selectChat(type: ChatType, id: string, title: string): void {
        this.setState({
            chatType: type,
            selectedRoom: id
        }, () => {
            this.props.requestRoom(this.state.selectedRoom, title);
        });
    }

    render(): JSX.Element {

        return (
            <div id="vertical-menu">
                <h3>Course Discussion</h3>

                <Courses
                    active={this.state.chatType === ChatType.COURSE_DISCUSSION}
                    socket={this.props.socket}
                    username={this.props.username}
                    selectChat={this.selectChat.bind(this)} />

                <hr className="chat-selector-line-break" />

                <h3>Direct Messages</h3>

                <DirectMessages
                    active={this.state.chatType === ChatType.DIRECT_MESSAGE}
                    socket={this.props.socket}
                    username={this.props.username}
                    selectChat={this.selectChat.bind(this)}/>
            </div>
        );
    }
}
