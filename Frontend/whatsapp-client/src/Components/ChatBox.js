import React, { Component } from "react";
import './ChatBox.css';

import server from '../server';
import socket from '../socket';

class ChatBox extends Component {

    isGroup = () => {
        console.log(this.props.isGroup);
    }

    render () {
        if (this.props.messages === undefined) {
            return (
                <p>Keep your phone connected</p>
            )
        } else {
            return (
                <ul className="messages">
                    {this.props.messages.map(message => {
                        if (!message.fromMe) { // if message.fromMe = false we give a certain style
                            if (message.hasMedia) {
                                if (message.contactName === undefined) {
                                    return (
                                        <li className="message-bubble fromElse">
                                            <h5 className="owner">{message.author}</h5>
                                            <p className="message-body">{message.body = "Media Message"}</p>
                                        </li>
                                    )
                                } else {
                                    return (
                                        <li className="message-bubble fromElse">
                                            <h5 className="owner">{message.contactName}</h5>
                                            <p className="message-body">{message.body = "Media Message"}</p>
                                        </li>
                                    )
                                }
                            } else {
                                if (message.contactName === undefined) {
                                    return (
                                        <li className="message-bubble fromElse">
                                            <h5 className="owner">{message.author}</h5>
                                            <p className="message-body">{message.body}</p>
                                        </li>
                                    )
                                } else {
                                    return (
                                        <li className="message-bubble fromElse">
                                            <h5 className="owner">{message.contactName}</h5>
                                            <p className="message-body">{message.body}</p>
                                        </li>
                                    )
                                }
                            }
                        } else if (message.fromMe) { // if message.fromMe = true we give a differetn style
                            if (message.hasMedia) {
                                return (
                                    <li className="message-bubble fromMe">{message.body = "Media Message"}</li>
                                )
                            } else {
                                return (
                                    <li className="message-bubble fromMe">{message.body}</li>
                                )
                            }
                        }
                    })}
                </ul>
            )
        }
    }
}

export default ChatBox;