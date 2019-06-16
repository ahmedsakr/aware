import React from 'react';
import './MessageInput.css';
import {UserMessageContents} from '../ChatWindow/Message/Message'
import produceTimestamp from '../../../aware-utils'

type MessageInputProps = {
  sendMessage: (message: UserMessageContents) => void,
  name: string
};

type MessageInputState = {
  message: string
};

export default class MessageInput extends React.Component<MessageInputProps, MessageInputState> {
  constructor(props: MessageInputProps) {
    super(props)

    this.state = {
      message: ''
    };

    // Need to bind 'this' to give access to keyword
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      //Set state variable to input value
      message: event.target.value
    })
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    //Prevents page refresh when form submit
    event.preventDefault();

    // Build a message object to be sent
    let messageObj: UserMessageContents = {
      username: this.props.name,
      content: this.state.message,
      timestamp: produceTimestamp(),
      avatar: "/" + this.props.name + "-pic.jpg"
    };

    this.props.sendMessage(messageObj);

    //Reset state of input to erase previous message
    this.setState({
      message: ''
    })
  }

  render(): JSX.Element {
    return (
      <form onSubmit={this.handleSubmit}>
        <div id="message-input">
          <input className="col-11" id="message-input-textfield" type="text" name="message" placeholder="Type here.." onChange={this.handleChange} value={this.state.message} />
          <input className="col-1" id="message-input-send-img" type="image" src={process.env.PUBLIC_URL + "/icons8-send-letter-80.png"} alt="SEND" disabled={!this.state.message} />
        </div>
      </form>
    );
  }
}
