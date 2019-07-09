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
            <div id="direct-messages" className="row">
                <p id="courses" className="col-12">Private Messages</p>
                <input id="textfield" placeholder="Search Messages..." />
                <DirectMessage
                    selectDirectMessage={this.props.selectDirectMessage}
                    room=""
                    src="/icons8-user-80.png"
                    name="Josh Campitelli" />
                <DirectMessage
                    selectDirectMessage={this.props.selectDirectMessage}
                    room=""
                    src="/icons8-user-80.png"
                    name="Ahmed Sakr" />
            </div>
        );
    }
}
