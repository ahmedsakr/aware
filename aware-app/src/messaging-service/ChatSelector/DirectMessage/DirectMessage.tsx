import React from 'react';
import './DirectMessage.scss';
import {Room} from '../ChatSelector'

type DirectMessageProps = {
    selectDirectMessage: (directMessage: Room) => void,
    room: string,
    src: string,
    name: string
};

type DirectMessageState = {
    selected: boolean
};

export default class DirectMessage extends React.Component<DirectMessageProps, DirectMessageState> {
    
    constructor(props: DirectMessageProps) {
        super(props);

        this.state = {
            selected: false
        }
    }

    render(): JSX.Element {
        const currentState =    this.state.selected ?
                                "chat-navigation-item-selected" :
                                "chat-navigation-item"
        return (
            <div onClick={() => this.props.selectDirectMessage} className={currentState}>
                <div className="direct-message-avatar col-2">
                    <img
                        src={process.env.PUBLIC_URL + this.props.src}
                        alt={this.props.name} />
                </div>

                <div className="direct-message-content col-10">
                    <p className="col-12">{this.props.name}</p>
                    <p className="direct-message-preview">Preview of last message...</p>
                </div>
            </div>
        );
    }
}
