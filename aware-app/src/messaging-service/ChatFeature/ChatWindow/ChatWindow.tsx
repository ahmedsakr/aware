import React from 'react';
import Message, {UserMessageContents} from "./Message/Message"
import './ChatWindow.css'

type ChatWindowProps = {
  messages: UserMessageContents[],
  name: string
};

type ChatWindowState = { };

export default class ChatWindow extends React.Component<ChatWindowProps, ChatWindowState> {
  
  private scrollRef: React.RefObject<HTMLDivElement>;

  constructor(props: ChatWindowProps) {
    super(props);

    this.scrollRef = React.createRef();
  }

  scrollToBottom = () => {
    if (this.scrollRef.current !== null) {
      this.scrollRef.current.scrollIntoView({ behavior: "auto" });
    }
  }

  componentDidMount(): void {
    this.scrollToBottom();
  }

  componentDidUpdate(): void {
    this.scrollToBottom();
  }

  render(): JSX.Element {
    return(
      <div id="chat">
        <div id="chat-messages">
          {
            this.props.messages.map(message => {
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
