import React from 'react';
import './DirectMessages.scss';
import DirectMessage from '../DirectMessage/DirectMessage'
import {Room} from '../ChatSelector'

type DirectMessagesProps = {
    selectDirectMessage: (directMessage: Room) => void
};

type DirectMessagesState = {};

export default class DirectMessages extends React.Component<DirectMessagesProps, DirectMessagesState> {
    render() {
        return (
            <div id="direct-messages">
                <input id="textfield" placeholder="Search Messages..." />

                <div id="direct-messages-new">
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
