import React, { Component } from 'react';
import './LeftHeader.css';

import server from '../server';

class LeftHeader extends Component {
    state = {
        wid: this.props.wid,
        pushname: undefined,
        img: "https://www.ssu.ca/wp-content/uploads/2020/08/default-profile.png"
    }

    fetchInfo = async () => {
        let url = server + "/api/whatsapp/info";
        let response = await fetch(url);
        let data = await response.json();

        this.setState({
            wid: this.state.wid,
            pushname: data.name,
            img: data.img
        });
    }

    componentDidMount() {
        this.fetchInfo()
    }

    render () {
        return (
            <header className="left-header">
                <div className="profilepic-container">
                    <div className="ppic">
                        <img src={this.state.img} />
                    </div>
                </div>
            </header>
        )
    }
}

export default LeftHeader;