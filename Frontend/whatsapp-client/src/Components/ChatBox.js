import React, { Component } from "react";
import './ChatBox.css';

import server from '../server';

class ChatBox extends Component {
    state = {
        messages: undefined
    }

    getMessages = async () => {
        let url = server + '/api/whatsapp/messages/' + this.props.selectedChat;
        let response = await fetch(url);
        let messages = await response.json();

        this.setState({
            messages: messages
        });
    }

    componentDidMount() {
        this.getMessages();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedChat !== this.props.selectedChat) {
            this.getMessages();
        }
    }

    render () {
        if (this.props.selectedChat === undefined) {
            return (
                <p>Keep your phone connected</p>
            )
        } else {
            return (
                <ul>
                    {this.state.messages.map(message => {
                        <li>{message.body}</li>
                    })}
                </ul>
            )
        }
    }
}

export default ChatBox;