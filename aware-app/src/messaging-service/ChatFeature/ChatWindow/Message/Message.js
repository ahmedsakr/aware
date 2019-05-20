import React, { Component } from 'react';
import './Message.css'
import ProfilePicture from '../../Profile/ProfilePicture'

class Message extends Component {

    produceMessageByThem(content) {
        return (
            <div class="col-sm-12 message received-message">
                <div class="col-sm-1 message-profile">
                    <ProfilePicture instance="message" activity="online"  picture={content.avatar}/>
                    <p class="message-profile-name">{content.studentName}</p>
                </div>

                <div class="col-sm-4 message-text received-message-text">
                    <p>{content.text}</p>
                </div>

                <div class="col-sm-2 message-timestamp received-message-timestamp">
                    <p>{content.timestamp}</p>
                </div>
            </div>
        );
    }

    produceMessageByMe(content) {
        return (
            <div class="col-sm-12 message sent-message">
                <div class="offset-sm-5 col-sm-2 message-timestamp sent-message-timestamp">
                    <p>{content.timestamp}</p> 
                </div>
                <div class="col-sm-4 message-text sent-message-text">
                    <p>{content.text}</p>
                </div>
                <div class="col-sm-1 message-profile">
                    <ProfilePicture instance="message" activity="online"  picture={content.avatar}/>
                    <p class="message-profile-name">{content.studentName}</p>
                </div>
            </div>
        );
    }
    
    render() {
        if (this.props.content.studentName == this.props.name) {
            return this.produceMessageByMe(this.props.content);
        } else {
            return this.produceMessageByThem(this.props.content);
        }
    }
}

export default Message;
