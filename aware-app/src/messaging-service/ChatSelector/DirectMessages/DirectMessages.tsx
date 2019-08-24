import React from 'react';
import './DirectMessages.scss';

import uuid from '../../../shared/uuid/aware-uuid'
import {ChatDomain} from '../ChatSelector'
import UserFinderOverlay from '../../overlays/UserFinder/UserFinderOverlay';

type DirectMessage = {
    id: string,
    name: string
}

type DirectMessagesProps = {
    active: boolean,
    socket: SocketIOClient.Socket,
    username: string,
    selectChat: (type: ChatDomain, id: string, title: string) => void
};

type DirectMessagesState = {
    showOverlay: boolean,
    chats: Set<DirectMessage>,
    activeDirectMessage: string
};

export default class DirectMessages extends React.Component<DirectMessagesProps, DirectMessagesState> {

    constructor(props: DirectMessagesProps) {
        super(props);

        this.state = {
            showOverlay: false,
            chats: new Set<DirectMessage>(),
            activeDirectMessage: ''
        }
    }

    componentWillMount(): void {
        if (this.props.socket) {

            // Retrieve all direct messages that the user is part of.
            this.props.socket.emit('get-direct-messages', this.props.username);

            // Listen for any updates in subscribed rooms for this user.
            this.props.socket.on('direct-messages', (chats: Set<DirectMessage>) => {
                this.setState({ chats });
            });
        }
    }

    startDirectMessage(username: string): void {

        let chat : DirectMessage = {
            id: uuid(),
            name: username
        };

        this.setState((prevState: DirectMessagesState) => {
            return {
                showOverlay: false, 
                chats: prevState.chats.add(chat)
            }
        }, () => this.selectDirectMessage(username));
    }

    selectDirectMessage(name: string): void {
        let chat : DirectMessage = Array.from(this.state.chats.values()).filter(user => user.name == name)[0];
        this.props.selectChat(ChatDomain.DIRECT_MESSAGE, chat.id, chat.name);
        this.setState({ activeDirectMessage: chat.id });
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
                    Array.from(this.state.chats.values()).map((chat: DirectMessage) => {
                        return (
                            <DirectMessage
                                selectDirectMessage={this.selectDirectMessage.bind(this)}
                                selected={this.props.active && this.state.activeDirectMessage === chat.id}
                                room={chat.id}
                                src="/icons8-user-80.png"
                                name={chat.name} />
                        )
                    })
                }

            </div>
        );
    }
}

type DirectMessageProps = {
    selectDirectMessage: (name: string) => void,
    selected: boolean,
    room: string,
    src: string,
    name: string
};

const DirectMessage: React.FC<DirectMessageProps> = (props) => {
    const currentState = "direct-message" + (props.selected ? "-selected" : "")

    return (
        <div
            onClick={() => props.selectDirectMessage(props.name)}
            className={currentState}>

            <div className="direct-message-avatar col-sm-2">
                <img
                    src={process.env.PUBLIC_URL + props.src}
                    alt={props.name} />
            </div>
            <div className="direct-message-content col-10">
                <p className="col-12">{props.name}</p>
                <p className="direct-message-preview">Preview of last message...</p>
            </div>
        </div>
    )
}