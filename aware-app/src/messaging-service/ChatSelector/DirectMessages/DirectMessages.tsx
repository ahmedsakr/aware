import React from 'react';
import './DirectMessages.scss';

import uuid from '../../../shared/uuid/aware-uuid'
import UserFinderOverlay from '../../overlays/UserFinder/UserFinderOverlay';
import { ChatDomain, MessengerChat } from '../../api/Messaging'

type DirectMessagesProps = {
    activeChat: string,
    socket: SocketIOClient.Socket,
    username: string,
    selectChat: (chat: MessengerChat) => void
};

type DirectMessagesState = {
    showOverlay: boolean,
    chats: MessengerChat[]
};

export default class DirectMessages extends React.Component<DirectMessagesProps, DirectMessagesState> {

    constructor(props: DirectMessagesProps) {
        super(props);

        this.state = {
            showOverlay: false,
            chats: []
        }
    }

    componentWillMount(): void {
        if (this.props.socket) {

            // Retrieve all direct messages that the user is part of.
            this.props.socket.emit('get-direct-messages', this.props.username);

            // Listen for any updates in subscribed rooms for this user.
            this.props.socket.on('direct-messages', (chats: MessengerChat[]) => {
                this.setState({ chats });
            });
        }
    }

    isExistingDirectMessage(username: string): Boolean {
        return this.state.chats
                .filter((chat: MessengerChat) => chat.data.receiverId === username)
                .length === 1
    }

    startDirectMessage(username: string): void {

        if (this.isExistingDirectMessage(username)) {
            this.setState({ showOverlay: false });
            return;
        }

        let chat : MessengerChat = {
            domain: ChatDomain.DIRECT_MESSAGE,
            data: {
                id: uuid(),
                name: username,
                icon: "/icons8-user-80.png",
                receiverId: username
            }
        };

        this.setState((prevState: DirectMessagesState) => {
            prevState.chats.push(chat);

            return {
                showOverlay: false, 
                chats: prevState.chats
            }
        }, () => this.props.selectChat(chat));
    }

    onOverlayClose() {
        this.setState({ showOverlay: false })
    }

    render() {
        return (
            <div id="direct-messages">
                <UserFinderOverlay
                        socket={this.props.socket}
                        username={this.props.username}
                        show={this.state.showOverlay}
                        close={this.onOverlayClose.bind(this)}
                        startDirectMessage={this.startDirectMessage.bind(this)}/>

                <input className="direct-messages-filter" id="textfield" placeholder="Search Messages..." />

                <div
                    onClick={() => this.setState({showOverlay: true})}
                    id="direct-messages-new" >

                    <span className="fa fa-plus" aria-hidden="true"></span>
                    <p>Start a direct message</p>
                </div>
                {
                    this.state.chats.map((chat: MessengerChat) => {
                        return (
                            <DirectMessage
                                selectChat={this.props.selectChat}
                                selected={this.props.activeChat === chat.data.id}
                                chat={chat} />
                        )
                    })
                }

            </div>
        );
    }
}

type DirectMessageProps = {
    selectChat: (chat: MessengerChat) => void,
    selected: boolean,
    chat: MessengerChat
};

const DirectMessage: React.FC<DirectMessageProps> = (props) => {
    const currentState = "direct-message" + (props.selected ? "-selected" : "")

    return (
        <div
            onClick={() => props.selectChat(props.chat)}
            className={currentState}>

            <div className="direct-message-avatar col-sm-2">
                <img
                    src={process.env.PUBLIC_URL + props.chat.data.icon}
                    alt={props.chat.data.name} />
            </div>
            <div className="direct-message-content col-10">
                <p className="col-12">{props.chat.data.name}</p>
                <p className="direct-message-preview">Preview of last message...</p>
            </div>
        </div>
    )
}