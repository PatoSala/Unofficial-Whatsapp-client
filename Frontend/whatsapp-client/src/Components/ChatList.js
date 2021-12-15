import React, { Component } from 'react';
import './ChatList.css';
import ChatObject from './ChatObject';
/* import { Spinner } from 'react-bootstrap'; */

import server from '../server';
import socket from '../socket';

class ChatList extends Component {
    state = {
        wid: this.props.wid,
        chats: undefined
    }

    fetchChats = async () => {
        let url = server + '/api/whatsapp/chats';
        let response = await fetch(url);
        let data = await response.json();

        this.setState({
            chats: data
        });
    }

    updateChats = socket.on('message', data => {
        this.fetchChats();
    });

    componentDidMount() {
        this.fetchChats();
    }

    render () {
        if (this.state.chats === undefined) {
            return (
               /*  <div className="loading-chats">
                    <Spinner animation="border" variant="primary"/>
                </div> */
                <p>loading</p>
            )
        } else {
            return (
                <div className="chatlist-container">
                    <div className="search-chat">
                        <label></label>
                    </div>
                    <div className="chatlist">
                        {this.state.chats.map(chat => {
                            return (
                                <ChatObject wid={chat.id._serialized} name={chat.name} unreadCount={chat.unreadCount} selectChat={this.props.selectChat}/>
                            );
                        })}
                        
                    </div>
                </div>
            )
        }
    }
}

export default ChatList;