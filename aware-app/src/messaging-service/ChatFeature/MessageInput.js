import React, {Component} from 'react';
import './MessageInput.css';
import {produceTimestamp} from '../../aware-utils.js'

class MessageInput extends Component {
  constructor() {
    super()
    this.state = {
       message: ''
    }
    //Need to bind 'this' to give access to keyword
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div id="message-input">
          <img id="insert-png" src={process.env.PUBLIC_URL + "/icons8-document-80.png"} alt="PDF"/>
          <input class="col-9" id="textfield" type="text" name="message" placeholder="Type here.." onChange={this.handleChange} value={this.state.message}/>
          <input id="send-img" type="image" src={process.env.PUBLIC_URL + "/icons8-send-letter-80.png"} alt="SEND" />
        </div>
      </form>
    );
  }

  handleChange(e) {
    this.setState({
      //Set state variable to input value
      message: e.target.value
    })
  }

  handleSubmit(e) {
    //Prevents page refresh when form submit
    e.preventDefault();
    // Build a message object to be sent
    const messageObj = {
      studentName: "Josh",
      text: this.state.message,
      timestamp: produceTimestamp(),
      avatar: "/icons8-user-80blue.png"
    };
    this.props.sendMessage(messageObj);
    //Reset state of input to erase previous message
    this.setState({
      message: ''
    })
  }
}

export default MessageInput;