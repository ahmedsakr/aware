import React from 'react';
import './DirectMessages.scss';

import uuid from '../../../shared/uuid/aware-uuid'
import { ChatDomain } from '../../api/DirectMessaging'
import UserFinderOverlay from '../../overlays/UserFinder/UserFinderOverlay';
import { DirectMessageAttributes } from '../../api/DirectMessaging'

type DirectMessagesProps = {
    activeChat: string,
    socket: SocketIOClient.Socket,
    username: string,
    selectChat: (id: string, title: string, domain: ChatDomain) => void
};

type DirectMessagesState = {
    showOverlay: boolean,
    chats: Set<DirectMessageAttributes>
};

export default class DirectMessages extends React.Component<DirectMessagesProps, DirectMessagesState> {

    constructor(props: DirectMessagesProps) {
        super(props);

        this.state = {
            showOverlay: false,
            chats: new Set<DirectMessageAttributes>()
        }
    }

    componentWillMount(): void {
        if (this.props.socket) {

            // Retrieve all direct messages that the user is part of.
            this.props.socket.emit('get-direct-messages', this.props.username);

            // Listen for any updates in subscribed rooms for this user.
            this.props.socket.on('direct-messages', (chats: Set<DirectMessageAttributes>) => {
                this.setState({ chats });
            });
        }
    }

    startDirectMessage(username: string): void {

        let chat : DirectMessageAttributes = {
            id: uuid(),
            name: username,
            iconRef: "/icons8-user-80.png"
        };

        this.setState((prevState: DirectMessagesState) => {
            return {
                showOverlay: false, 
                chats: prevState.chats.add(chat)
            }
        }, () => this.selectDirectMessage(chat));
    }

    selectDirectMessage(chat: DirectMessageAttributes): void {
        this.props.selectChat(chat.id, chat.name, ChatDomain.DIRECT_MESSAGE);
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
                    Array.from(this.state.chats.values()).map((chat: DirectMessageAttributes) => {
                        return (
                            <DirectMessage
                                selectDirectMessage={this.selectDirectMessage.bind(this)}
                                selected={this.props.activeChat === chat.id}
                                chat={chat} />
                        )
                    })
                }

            </div>
        );
    }
}

type DirectMessageProps = {
    selectDirectMessage: (chat: DirectMessageAttributes) => void,
    selected: boolean,
    chat: DirectMessageAttributes
};

const DirectMessage: React.FC<DirectMessageProps> = (props) => {
    const currentState = "direct-message" + (props.selected ? "-selected" : "")

    return (
        <div
            onClick={() => props.selectDirectMessage(props.chat)}
            className={currentState}>

            <div className="direct-message-avatar col-sm-2">
                <img
                    src={process.env.PUBLIC_URL + props.chat.iconRef}
                    alt={props.chat.name} />
            </div>
            <div className="direct-message-content col-10">
                <p className="col-12">{props.chat.name}</p>
                <p className="direct-message-preview">Preview of last message...</p>
            </div>
        </div>
    )
}