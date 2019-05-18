import React, { Component } from 'react';
import './Message.css'
import ProfilePicture from '../../Profile/ProfilePicture'

class Message extends Component {

    produceMessageByThem(content) {
        return (
            <div class="received-message">
                <div class="col-sm-1 received-message-profile">
                    <img class="received-message-profile-img" src={process.env.PUBLIC_URL + content.avatar} alt={content.student} />
                    <p class="received-message-profile-name">{content.student}</p>
                </div>

                <div class="col-sm-4 received-message-text">
                    {content.text}
                </div>

                <div class="col-sm-2 received-message-timestamp">
                    {content.timestamp}
                </div>
            </div>
        );
    }

    produceMessageByMe(content) {
        return (
            <div class="col-sm-12 sent-message">
                <div class="offset-sm-5 col-sm-2 sent-message-timestamp">
                    <p>{content.timestamp}</p> 
                </div>
                <div class="col-sm-4 sent-message-text">
                    <p>{content.text}</p>
                </div>
                <div class="col-sm-1 sent-message-profile">
                    <ProfilePicture instance="message" activity="online"  picture={content.avatar}/>
                    <p class="sent-message-profile-name">{content.studentName}</p>
                </div>
            </div>
        );
    }
    
    render() {
        if (this.props.content.studentName === this.props.name) {
            return this.produceMessageByMe(this.props.content);
        } else {
            return this.produceMessageByThem(this.props.content);
        }
    }
}

export default Message;
