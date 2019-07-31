import React from 'react';
import './Messenger.scss';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../node_modules/font-awesome/css/font-awesome.min.css'

import NavBar from './NavigationBar/NavBar/NavBar'
import ChatSelector from './ChatSelector/ChatSelector'
import ChatWindow from './ChatFeature/ChatWindow/ChatWindow'
import { UserMessageContents } from './ChatFeature/ChatWindow/Message/Message'
import ActivityPanel from './ChatFeature/ActivityPanel/ActivityPanel'
import MessageInput from './ChatFeature/MessageInput/MessageInput'
import NewsletterOverlay from '../shared/overlay/test/NewsletterOverlay'

type MessengerProps = {
    socket: SocketIOClient.Socket,
    username: string
};

type MessengerState = {
    messages: UserMessageContents[],
    chatTitle: string,
    groupId: string
};

export default class Messenger extends React.Component<MessengerProps, MessengerState> {
    constructor(props: MessengerProps) {
        super(props);

        this.state = {
            messages: [],
            chatTitle: "",
            groupId: ""
        }
    }

    componentDidMount(): void {
        if (this.props.socket) {
            this.props.socket.on('chat message', (message: UserMessageContents) => {
                this.setState({
                    messages: this.state.messages.concat([message])
                })
            })

            this.props.socket.on('chat history', (messages: UserMessageContents[]) => {
                this.setState({
                    messages: messages
                })
            })
        }
    }

    render(): JSX.Element {
        const { selectRoom, sendMessage } = this;

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
                                    selectRoom={selectRoom} />
                            </div>

                            <div id="messenger" className="col-10 p-0">
                                <ActivityPanel 
                                    socket={this.props.socket}
                                    activeRoom={'sysc2100'}/>

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

    selectRoom = (groupId: string, title: string) => {
        this.props.socket.emit('room', groupId)
        this.setState({
            messages: [],
            chatTitle: title,
            groupId: groupId
        });
    }

    sendMessage = (message: UserMessageContents) => {
        this.props.socket.emit('chat message', message, this.state.groupId, this.props.username);
    }
}
