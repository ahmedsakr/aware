import React from 'react';
import './DirectMessages.scss';
import DirectMessage from '../DirectMessage/DirectMessage'
import {Room} from '../ChatSelector'
import UserFinderOverlay from '../../overlays/UserFinder/UserFinderOverlay';

type DirectMessagesProps = {
    socket: SocketIOClient.Socket,
    username: string,
    selectDirectMessage: (directMessage: Room) => void
};

type DirectMessagesState = {};

export default class DirectMessages extends React.Component<DirectMessagesProps, DirectMessagesState> {
    render() {
        return (
            <div id="direct-messages">
                <UserFinderOverlay
                    socket={this.props.socket}
                    username={this.props.username} />

                <input className="direct-messages-filter" id="textfield" placeholder="Search Messages..." />

                <div
                    data-toggle="modal"
                    data-target={"#user-finder-overlay"}
                    id="direct-messages-new" >

                    <span className="fa fa-plus" aria-hidden="true"></span>
                    <p>Start a direct message</p>
                </div>

                <DirectMessage
                    selectDirectMessage={this.props.selectDirectMessage}
                    room=""
                    src="/icons8-user-80.png"
                    name="Josh Campitelli" />
            </div>
        );
    }
}
