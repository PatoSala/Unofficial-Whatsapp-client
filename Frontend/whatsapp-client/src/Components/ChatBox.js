import React, { Component } from "react";
import './ChatBox.css';

import server from '../server';
import socket from '../socket';

class ChatBox extends Component {

    render () {
        if (this.props.messages === undefined) {
            return (
                <p>Keep your phone connected</p>
            )
        } else {
            return (
                <ul className="messages">
                    {this.props.messages.map(message => {
                        if (message.fromMe === false) { // if message.fromMe = false we give a certain style
                            return (
                                <li className="chatMessage fromElse">{message.body}</li>
                            )
                        } else if (message.fromMe === true) { // if message.fromMe = true we give a differetn style
                            return (
                                <li className="chatMessage fromMe">{message.body}</li>
                            )
                        }
                    })}
                </ul>
            )
        }
    }
}

export default ChatBox;