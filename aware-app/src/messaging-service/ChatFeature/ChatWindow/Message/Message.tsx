import React from 'react';
import './Message.css'
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

type MessageState = { };

export default class Message extends React.Component<MessageProps, MessageState> {

    produceMessageByThem(content: UserMessageContents): JSX.Element {
        return (
            <div className="col-sm-12 message received-message">
                <div className="col-sm-1 message-profile">
                    <ProfilePicture instance="message" activity="online"  picture={content.avatar}/>
                    <p className="message-profile-name">{content.username}</p>
                </div>

                <div className="col-sm-4 message-text received-message-text">
                    <p>{content.content}</p>
                </div>

                <div className="col-sm-2 message-timestamp received-message-timestamp">
                    <p>{content.timestamp}</p>
                </div>
            </div>
        );
    }

    produceMessageByMe(content: UserMessageContents): JSX.Element {
        return (
            <div className="col-sm-12 message sent-message">
                <div className="offset-sm-5 col-sm-2 message-timestamp sent-message-timestamp">
                    <p>{content.timestamp}</p> 
                </div>
                <div className="col-sm-4 message-text sent-message-text">
                    <p>{content.content}</p>
                </div>
                <div className="col-sm-1 message-profile">
                    <ProfilePicture instance="message" activity="online"  picture={content.avatar}/>
                    <p className="message-profile-name">{content.username}</p>
                </div>
            </div>
        );
    }
    
    render() {
        if (this.props.content.username === this.props.name) {
            return this.produceMessageByMe(this.props.content);
        } else {
            return this.produceMessageByThem(this.props.content);
        }
    }
}
