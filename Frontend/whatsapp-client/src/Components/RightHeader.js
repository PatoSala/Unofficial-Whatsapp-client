import React, { Component } from 'react';
import server from '../server';

import './RightHeader.css';

class RightHeader extends Component {
    state = {
        pushname: undefined,
        img: "https://www.ssu.ca/wp-content/uploads/2020/08/default-profile.png",
        isGroup: false
    }

    getChatInfo = async () => {
        let url = server + '/api/whatsapp/info/' + this.props.selectedChat;
        let response = await fetch(url);
        let chatInfo = await response.json();

        this.setState({
            pushname: chatInfo.name,
            img: chatInfo.img,
            isGroup: chatInfo.isGroup
        });

        this.props.isGroup(chatInfo.isGroup)
    }

    componentDidMount() {
        this.getChatInfo();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedChat !== this.props.selectedChat) {
            this.getChatInfo();
        }
    }

    render () {
        if (this.props.selectedChat === undefined) {
            return (
                <p></p>
            )
        } else {
            return (
                <header className="right-header">
                    <div className="open-chat-info">
                        <div className="open-chat-ppic">
                            <img src={this.state.img}/>
                        </div>
                        <h3 className="open-chat-name">{this.state.pushname}</h3>
                    </div>
                </header>
            )
        }
    }
}

export default RightHeader;
