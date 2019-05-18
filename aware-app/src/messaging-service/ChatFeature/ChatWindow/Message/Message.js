import React, { Component } from 'react';
import './Message.css'

class Message extends Component {

    produceMessageByThem(content) {
        return (
            <div class="received-message">
                <div class="col-sm-2 received-message-profile">
                    <img class="received-message-profile-img" src={process.env.PUBLIC_URL + content.avatar} alt={content.student} />
                    <p class="received-message-profile-name">{content.student}</p>
                </div>

                <div class="col-sm-7 received-message-text">
                    {content.text}
                </div>

                <div class="col-sm-3 received-message-timestamp">
                    {content.timestamp}
                </div>
            </div>
        );
    }

    produceMessageByMe(content) {
        return (
            <div class="sent-message">
                <div class="col-sm-3 sent-message-timestamp">
                    {content.timestamp}
                </div>
                <div class="col-sm-7 sent-message-text">
                    {content.text}
                </div>
                <div class="col-sm-2 sent-message-profile">
                    <img class="sent-message-profile-img" src={process.env.PUBLIC_URL + content.avatar} alt={content.student} />
                    <p class="sent-message-profile-name">{content.student}</p>
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
