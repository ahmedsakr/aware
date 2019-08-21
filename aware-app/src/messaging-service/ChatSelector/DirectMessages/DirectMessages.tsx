import React from 'react';
import './DirectMessages.scss';
import {ChatType} from '../ChatSelector'
import UserFinderOverlay from '../../overlays/UserFinder/UserFinderOverlay';

type DirectMessagesProps = {
    active: boolean,
    socket: SocketIOClient.Socket,
    username: string,
    selectChat: (type: ChatType, id: string) => void
};

type DirectMessagesState = {
    showOverlay: boolean,
    users: Set<string>,
    activeDirectMessage: string
};

export default class DirectMessages extends React.Component<DirectMessagesProps, DirectMessagesState> {

    constructor(props: DirectMessagesProps) {
        super(props);

        this.state = {
            showOverlay: false,
            users: new Set<string>(),
            activeDirectMessage: ''
        }
    }

    startDirectMessage(username: string): void {
        this.setState((prevState: DirectMessagesState) => {
            return {
                showOverlay: false, 
                users: prevState.users.add(username),
                activeDirectMessage: username
            }
        });
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
                    Array.from(this.state.users.values()).map((name: string) => {
                        return (
                            <DirectMessage
                                selectChat={this.props.selectChat}
                                selected={this.props.active && this.state.activeDirectMessage === name}
                                room={name}
                                src="/icons8-user-80.png"
                                name={name} />
                        )
                    })
                }

            </div>
        );
    }
}

type DirectMessageProps = {
    selectChat: (type: ChatType, id: string) => void,
    selected: boolean,
    room: string,
    src: string,
    name: string
};

const DirectMessage: React.FC<DirectMessageProps> = (props) => {
    const currentState = "direct-message" + (props.selected ? "-selected" : "")

    return (
        <div
            onClick={() => props.selectChat(ChatType.DIRECT_MESSAGE, props.name)}
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