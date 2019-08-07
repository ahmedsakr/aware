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

type DirectMessagesState = {
    overlay: JSX.Element;
};

export default class DirectMessages extends React.Component<DirectMessagesProps, DirectMessagesState> {
    
    private showModal: (() => void) | null = null;
    private hideModal: (() => void) | null = null;

    constructor(props: DirectMessagesProps) {
        super(props);

        this.state = {
            overlay: <UserFinderOverlay
                        socket={this.props.socket}
                        username={this.props.username}
                        ref={this.modal} />
        }
    }

    modal = ({show, hide}: UserFinderOverlay) => {
        this.showModal = show;
        this.hideModal = hide;
    }
    
    render() {

        
        return (
            <div id="direct-messages">
                {this.state.overlay}

                <input className="direct-messages-filter" id="textfield" placeholder="Search Messages..." />

                <div
                    onClick={() => {
                        if (this.showModal !== null) {
                            this.showModal();
                        }
                    }
                    }
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
