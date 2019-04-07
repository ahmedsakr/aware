  import React, { Component } from 'react';
import './ChatTitle.css'

class ChatTitle extends Component {

    render() {
        const {course} = this.props;

        return(
            <div id="chat-title">
                <p>{course} - Course Discussion</p>
            </div>
        );
    }
}

export default ChatTitle;
