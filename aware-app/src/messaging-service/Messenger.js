import React, { Component } from 'react';
import './Messenger.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../node_modules/font-awesome/css/font-awesome.min.css'

import NavBar from './NavigationBar/NavBar/NavBar'
import ChatSelector from './ChatSelector/ChatSelector'
import ChatWindow from './ChatFeature/ChatWindow/ChatWindow'
import ActivityPanel from './ChatFeature/ActivityPanel/ActivityPanel'
import MessageInput from './ChatFeature/MessageInput/MessageInput'
import NewsletterOverlay from '../shared/overlay/test/NewsletterOverlay'

class Messenger extends Component {
  constructor() {
    super();

    this.state = {
      messages: [],
      chatTitle: ""
    }
  }

  componentDidMount() {
    this.props.socket.on('chat message', message => {
      this.setState({
        messages: this.state.messages.concat([message])
      })
    })

    this.props.socket.on('chat history', messages => {
      this.setState({
        messages: messages
      })
    })
  }

  render() {
    const {selectRoom, sendMessage } = this;

    return (
      <div class="aware-container" className="App">
        <div className="container-fluid aware-container">
          <NewsletterOverlay />

          <div id="messenger-root" class="row">
            <div class="col-12 p-0" id="navigation-header">
              <NavBar activeRoom={this.state.chatTitle} />
            </div>

            <div class="col-12 p-0" id="messenger-body">
              <div class="col-2 p-0">
                <ChatSelector
                  socket={this.props.socket}
                  username={this.props.name}
                  selectRoom={selectRoom} />
              </div>

              <div id="messenger" class="col-10 p-0">
                <ActivityPanel />

                <ChatWindow
                  messages={this.state.messages}
                  name={this.props.name} />

                <MessageInput
                  sendMessage={sendMessage}
                  name={this.props.name} />
              </div>
            </div>
          </div>
        </div>
        
      </div>
    );
  }

  selectRoom = (room) => {
    this.props.socket.emit('room', room)
    this.setState({ 
      messages: [],
      chatTitle: room,
     });
  }

  sendMessage = (message) => {
    this.props.socket.emit('chat message', message, this.state.chatTitle, this.props.name)
  }
}

export default Messenger;
