import React from 'react';
import './DirectMessages.scss';
import DirectMessage from '../DirectMessage/DirectMessage'
import {Room} from '../ChatSelector'
import UserFinderOverlay from '../../overlays/UserFinder/UserFinderOverlay';
import { getRelatedUsers } from '../../db/userRelations';

type DirectMessagesProps = {
    socket: SocketIOClient.Socket,
    username: string,
    selectDirectMessage: (directMessage: Room) => void
};

type DirectMessagesState = {
    showOverlay: boolean,
    users: Set<string>
};

export default class DirectMessages extends React.Component<DirectMessagesProps, DirectMessagesState> {

    constructor(props: DirectMessagesProps) {
        super(props);

        this.state = {
            showOverlay: false,
            users: new Set<string>()
        }
    }

    startDirectMessage(username: string): void {
        this.setState((prevState: DirectMessagesState) => {
            return {
                showOverlay: false, 
                users: prevState.users.add(username)
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
                                selectDirectMessage={this.props.selectDirectMessage}
                                room=""
                                src="/icons8-user-80.png"
                                name={name} />
                        )
                    })
                }

            </div>
        );
    }
}
