import React from 'react';
import Courses from './Courses/Courses'
import './ChatSelector.scss'
import DirectMessages from './DirectMessages/DirectMessages'
import { ChatDomain } from '../api/DirectMessaging';

type ChatSelectorProps = {
    requestRoom: (id: string, username: string, domain: ChatDomain) => void,
    socket: SocketIOClient.Socket,
    username: string,
    chatDomain: ChatDomain
};

type ChatSelectorState = {
    selectedChat: string
};

export default class ChatSelector extends React.Component<ChatSelectorProps, ChatSelectorState> {

    constructor(props: ChatSelectorProps) {
        super(props)

        this.state = {
            selectedChat: ''
        };
    }

    /**
     * Requests a room change from the server and updates the highlighted
     * room to reflect the new room.
     *
     * @param room A new course or direct message chosen by the user
     */
    selectChat(id: string, title: string, domain: ChatDomain): void {

        // Perform no action when user has selected the current chat.
        if (id == this.state.selectedChat) {
            return;
        }

        this.setState({
            selectedChat: id
        }, () => this.props.requestRoom(this.state.selectedChat, title, domain));
    }

    render(): JSX.Element {

        return (
            <div id="vertical-menu">
                <h3>Course Discussion</h3>

                <Courses
                    activeChat={this.state.selectedChat}
                    socket={this.props.socket}
                    username={this.props.username}
                    selectChat={this.selectChat.bind(this)} />

                <hr className="chat-selector-line-break" />

                <h3>Direct Messages</h3>

                <DirectMessages
                    activeChat={this.state.selectedChat}
                    socket={this.props.socket}
                    username={this.props.username}
                    selectChat={this.selectChat.bind(this)}/>
            </div>
        );
    }
}
