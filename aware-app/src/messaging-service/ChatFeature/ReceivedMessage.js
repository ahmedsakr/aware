import React, { Component } from 'react';
import './ReceivedMessage.css';

class ReceivedMessage extends Component {
    render() {
        const { student, avatar, message, timestamp } = this.props;

        return (
            <div class="receivedMessage">
                <div class="col-sm-2 receivedMessage-profile">
                    <img class="receivedMessage-profile-img" src={process.env.PUBLIC_URL + avatar} alt={student} />
                    <p class="receivedMessage-profile-name">{student}</p>
                </div>

                <div class="col-sm-7 receivedMessage-text">
                    {message}
                </div>

                <div class="col-sm-3 receivedMessage-timestamp">
                    {timestamp}
                </div>
            </div>
        );
    }
}

export default ReceivedMessage;
