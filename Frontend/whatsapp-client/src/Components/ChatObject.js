import React, { Component } from "react";
import './ChatObject.css';

import server from '../server';

class ChatObject extends Component {

    state = {
        img: "https://www.ssu.ca/wp-content/uploads/2020/08/default-profile.png"
    }

    getProfilePic = async () => {
        let url = server + '/api/whatsapp/ppic/' + this.props.wid;
        let response = await fetch(url);
        let data = await response.json();

        this.setState({
            img: data
        });
    }

    render () {
        return (
            <div className="chat-obj" onClick={() => {
                this.props.selectChat(this.props.wid);
            }}>
                <div className="profilepic-section">
                    <div className="profilepic-wrapper">
                        <img src={this.state.img}/>
                    </div>
                </div>
                <div className="chat-info">
                    <p>{this.props.name}</p>
                    <p>{this.props.wid}</p>
                    <p>Unread: {this.props.unreadCount}</p>
                </div>
            </div>
        )
    }
}

export default ChatObject;