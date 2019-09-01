import React from 'react';
import Courses from './Courses/Courses'
import './ChatSelector.scss'
import DirectMessages from './DirectMessages/DirectMessages'
import { MessengerChat } from '../api/Messaging';

type ChatSelectorProps = {
    requestRoom: (chat: MessengerChat) => void,
    socket: SocketIOClient.Socket,
    username: string,
    activeChat: string
};

export const ChatSelector: React.FC<ChatSelectorProps> = (props) => {
    return (
        <div id="vertical-menu">
            <h3>Course Discussion</h3>

            <Courses
                activeChat={props.activeChat}
                socket={props.socket}
                username={props.username}
                selectChat={props.requestRoom} />

            <hr className="chat-selector-line-break" />

            <h3>Direct Messages</h3>

            <DirectMessages
                activeChat={props.activeChat}
                socket={props.socket}
                username={props.username}
                selectChat={props.requestRoom} />
        </div>
    );
}
