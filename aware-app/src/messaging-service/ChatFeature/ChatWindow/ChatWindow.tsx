import React from 'react';
import Message from "./Message/Message"
import { UserMessage } from '../../../shared/messaging/messenger'
import './ChatWindow.scss'

type ChatWindowProps = {
    socket: SocketIOClient.Socket,
    name: string
};

type ChatWindowState = {
    messages: UserMessage[],
};

export default class ChatWindow extends React.Component<ChatWindowProps, ChatWindowState> {

    private scrollRef: React.RefObject<HTMLDivElement>;

    constructor(props: ChatWindowProps) {
        super(props);
        this.scrollRef = React.createRef();
        
        this.state = {
            messages: []
        }
    }

    scrollToBottom = () => {
        if (this.scrollRef.current !== null) {
            this.scrollRef.current.scrollIntoView({ behavior: "auto" });
        }
    }

    componentDidMount(): void {
        this.scrollToBottom();

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

    componentDidUpdate(): void {
        this.scrollToBottom();
    }

    render(): JSX.Element {
        return (
            <div id="chat">
                <div id="chat-messages">
                    {
                        this.state.messages.map(message => {
                            message['avatar'] = "/" + message.username + "-pic.jpg";
                            return (
                                <Message name={this.props.name} content={message} />
                            )
                        })
                    }
                    <div id="scrollbar" ref={this.scrollRef}></div>
                </div>
            </div>
        );
    }
}
