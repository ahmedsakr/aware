import React from 'react';
import Tooltip from 'react-tooltip'
import './Message.scss'
import ProfilePicture from '../../Profile/ProfilePicture'

export interface UserMessageContents {
    username: string,
    avatar: string,
    content: string,
    timestamp: string,
};

type MessageProps = {
    content: UserMessageContents,
    name: string
};

type MessageState = {
    tooltip: JSX.Element
};

export default class Message extends React.Component<MessageProps, MessageState> {
    constructor(props: MessageProps) {
        super(props);

        this.state = {
            tooltip: (
                <Tooltip
                    effect="solid"
                    multiline={true}
                    border={true} />
            )
        }
    }
    produceMessageByThem(content: UserMessageContents): JSX.Element {
        return (
            <div className="col-sm-12 message received-message">
                <div className="col-sm-1 message-profile">
                    <ProfilePicture instance="message" activity="online"  picture={content.avatar}/>
                    <p className="message-profile-name">{content.username}</p>
                </div>

                <div className="col-sm-8 message-text received-message-text">
                    <p data-tip={content.timestamp} data-place="right">{content.content}</p>
                </div>

                {this.state.tooltip}
            </div>
        );
    }

    produceMessageByMe(content: UserMessageContents): JSX.Element {
        return (
            <div className="col-sm-12 message sent-message">
                <div className="offset-sm-3 col-sm-8 message-text sent-message-text">
                    <p data-tip={content.timestamp} data-place="left">{content.content}</p>
                </div>
                <div className="col-sm-1 message-profile">
                    <ProfilePicture instance="message" activity="online"  picture={content.avatar}/>
                    <p className="message-profile-name">{content.username}</p>
                </div>

                {this.state.tooltip}
            </div>
        );
    }
    
    render(): JSX.Element {
        if (this.props.content.username === this.props.name) {
            return this.produceMessageByMe(this.props.content);
        } else {
            return this.produceMessageByThem(this.props.content);
        }
    }
}
