import React, { Component } from 'react';
import './ChatTitle.css'

class ChatTitle extends Component {

    render() {
        const {chatTitle} = this.props;

        return(
            <div id="chat-title">
                <p>{chatTitle} - Course Discussion</p>
            </div>
        );
    }
}

export default ChatTitle;
