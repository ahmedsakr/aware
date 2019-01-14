import React, { Component } from 'react';
import Message from "./Message"
import './ChatWindow.css'

class ChatWindow extends Component {
    render() {
        return(
            <div id="chat">
                <Message student="Ahmed" avatar="/icons8-user-80blue.png" message="Yeah, I am kinda drunk."
                    timestamp="December 1, 2018 - 12:22 pm"/>
                <Message student="Josh" avatar="/icons8-user-80blue.png" message="Same broda."
                    timestamp="December 1, 2018 - 12:37pm"/>
                <Message student="Arsalan" avatar="/icons8-user-80blue.png" message="guys, I am hungry."
                    timestamp="December 1, 2018 - 12:41pm"/>
            </div>
        );
    }
}

export default ChatWindow;
