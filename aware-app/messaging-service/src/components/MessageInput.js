import React, {Component} from 'react';
import '../style/MessageInput.css';

class MessageInput extends Component {
  render() {
    return (
      <div id="message-input">
        <img id="insert-png" src={process.env.PUBLIC_URL + "/icons8-document-80.png"} alt="PDF"/>
        <input class="col-9" id="textfield" type="text" name="message" placeholder="Type here.."/>
        <input id="send-img" type="image" src={process.env.PUBLIC_URL + "/icons8-send-letter-80.png"} alt="SEND" />
      </div>
    );
  }
}

export default MessageInput;
