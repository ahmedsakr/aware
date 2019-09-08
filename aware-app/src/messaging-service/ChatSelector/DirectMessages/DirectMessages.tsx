import React from 'react';
import './DirectMessages.scss';

import uuid from '../../../shared/uuid/aware-uuid'
import UserFinderOverlay from '../../overlays/UserFinder/UserFinderOverlay';
import { ChatDomain, MessengerChat, ChatData } from '../../api/Messaging'

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
            this.props.socket.on('direct-messages', (direct_messages: ChatData[]) => {
                let chats: MessengerChat[] = [];
                direct_messages.forEach((direct_message: ChatData) => {
                    direct_message.icon = "/icons8-user-80.png";
                    chats.push({
                        domain: ChatDomain.DIRECT_MESSAGE,
                        data: direct_message
                    });
                });
                this.setState({ chats });
            });
        }
    }

    getDirectMessage(username: string): MessengerChat | null {
        let search: MessengerChat[] =
            this.state.chats.filter((chat: MessengerChat) => chat.data.receiverId === username);
        
        if (search.length > 0) {
            return search[0];
        } else {
            return null;
        }
    }

    startDirectMessage(username: string): void {
        let chat: MessengerChat | null = this.getDirectMessage(username);

        if (chat !== null) {
            this.setState({
                showOverlay: false
            }, () => this.props.selectChat(chat as MessengerChat));
        } else {
            chat = {
                domain: ChatDomain.DIRECT_MESSAGE,
                data: {
                    id: uuid(),
                    name: username,
                    icon: username + "-pic.jpg",
                    receiverId: username
                }
            };

            this.setState((prevState: DirectMessagesState) => {
                prevState.chats.push(chat as MessengerChat);

                return {
                    showOverlay: false, 
                    chats: prevState.chats
                }
            }, () => this.props.selectChat(chat as MessengerChat));
        }
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