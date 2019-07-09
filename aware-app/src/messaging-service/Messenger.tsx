import React from 'react';
import './Messenger.scss';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../node_modules/font-awesome/css/font-awesome.min.css'

import NavBar from './NavigationBar/NavBar/NavBar'
import ChatSelector from './ChatSelector/ChatSelector'
import ChatWindow from './ChatFeature/ChatWindow/ChatWindow'

import ActivityPanel from './ChatFeature/ActivityPanel/ActivityPanel'
import MessageInput from './ChatFeature/MessageInput/MessageInput'
import { UserMessage } from '../shared/messaging/messenger'
import NewsletterOverlay from '../shared/overlay/test/NewsletterOverlay'

type MessengerProps = {
    socket: SocketIOClient.Socket,
    username: string
};

type MessengerState = {
    messages: UserMessage[],
    chatTitle: string,
    roomId: string
};

export default class Messenger extends React.Component<MessengerProps, MessengerState> {
    constructor(props: MessengerProps) {
        super(props);

        this.state = {
            messages: [],
            chatTitle: "",
            roomId: ""
        }
    }

    componentDidMount(): void {
        if (this.props.socket) {
            this.props.socket.on('chat message', (message: UserMessage) => {
                this.setState({
                    messages: this.state.messages.concat([message])
                })
            })

            this.props.socket.on('chat history', (messages: UserMessage[]) => {
                this.setState({
                    messages: messages
                })
            })
        }
    }

    render(): JSX.Element {
        const { requestRoom, sendMessage } = this;

        return (
            <div className="aware-container App">
                <div className="container-fluid aware-container">
                    <NewsletterOverlay />

                    <div id="messenger-root" className="row">
                        <div className="col-12 p-0" id="navigation-header">
                            <NavBar activeRoom={this.state.chatTitle} />
                        </div>

                        <div className="col-12 p-0" id="messenger-body">
                            <div className="col-2 p-0">
                                <ChatSelector
                                    socket={this.props.socket}
                                    username={this.props.username}
                                    requestRoom={requestRoom} />
                            </div>

                            <div id="messenger" className="col-10 p-0">
                                <ActivityPanel />

                                <ChatWindow
                                    messages={this.state.messages}
                                    name={this.props.username} />

                                <MessageInput
                                    sendMessage={sendMessage}
                                    name={this.props.username} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
    
    /**
     * Request a room change from the server.
     * 
     * @param id The id associated with the room
     * @param title The title of the room
     */
    requestRoom = (id: string, title: string) => {
        this.props.socket.emit('room', id)

        // Pre-emptively reset the state of the chat window in preparation
        // for a response from the server.
        this.setState({
            messages: [],
            chatTitle: title,
            roomId: id
        });
    }

    /**
     * Send a new message from the user to the server for the current room.
     * 
     * @param message The message packet containing the building blocks of the message.
     */
    sendMessage = (message: UserMessage) => {
        this.props.socket.emit('chat message', message, this.state.roomId);
    }
}
