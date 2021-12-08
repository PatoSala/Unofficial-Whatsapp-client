import React, { Component } from 'react';
import QRCode from 'qrcode.react';

import './Window.css';
import LeftHeader from './LeftHeader';
import ChatList from './ChatList';
import RightHeader from './RightHeader';
import ChatBox from './ChatBox';

import socket from '../socket';
import server from '../server';

class Window extends Component {
    state = {
        logged: false,
        qr: undefined,
        wid: undefined,
        chats: undefined,
        selectedChat: undefined
    }

    // we trigger an http req to init wpp client
    startClient = async () => {
        let url = server + '/api/whatsapp/init';
        let response = await fetch(url);
        let data = await response;
    }

    // on 'qr' event we pass the string value recieved to state
    updateQr = socket.on('qr', (qr) => {
        console.log(qr)
        this.setState({
            logged: false,
            qr: qr
        })
    });

    // on 'auth' event we logged the user 
    onReady = socket.on('ready', (data) => {
        console.log('auth completed!');
        this.setState({
            logged: data.logged,
            wid: data.wid
        });
    });

    // when chat on chat list is clicked, wid is set to selectedChat state
    selectChat = (wid) => {
        this.setState({
            selectedChat: wid
        });
        console.log(wid);
    }

    componentDidMount() {
        if (this.state.logged === false) {
            this.startClient();
        }
    }

    render () {
        if (this.state.logged === false) {
            if (this.state.qr === undefined) {
                return (
                    <h1>Loading...</h1>
                )
            } else {
                return (
                    <QRCode value={this.state.qr} size={264} includeMargin={false}/>
                )
            }
        } else {
            return (
                <>
                    <div className="left-container">
                        <LeftHeader wid={this.state.wid}/>
                        <ChatList wid={this.state.wid} chats={this.state.chats} selectChat={this.selectChat}/>
                    </div>
                    <div className="right-container">
                        <RightHeader selectedChat={this.state.selectedChat}/>
                        <ChatBox selectChat={this.state.selectedChat}/>
                    </div>
                </>
            )
        }
    }
};

export default Window;