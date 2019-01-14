import React, { Component } from 'react';
import './Message.css';

class Message extends Component {

    render() {
        const { student, avatar, message, timestamp } = this.props;

        return (
            <div class="message">
                <div class="col-sm-2 message-profile">
                    <img class="message-profile-img" src={process.env.PUBLIC_URL + avatar} alt={student} />
                    <p class="message-profile-name">{student}</p>
                </div>

                <div class="col-sm-7 message-text">
                    {message}
                </div>

                <div class="col-sm-3 message-timestamp">
                    {timestamp}
                </div>
            </div>
        );
    }
}

export default Message;
