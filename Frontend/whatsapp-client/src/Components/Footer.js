import React, { Component } from "react";
import './Footer.css';

class Footer extends Component {
    state = {
        wid: undefined,
        text: undefined
    }

    render () {
        return (
            <footer>
                <form onSubmit={this.onSubmit}>
                    <input type="input" className="messageField" name="message" value={this.state.message} onChange={this.handleChange} placeholder="Type something..."></input>
                    <button type="submit" className="send-message"><img src="https://img.icons8.com/fluent-systems-regular/32/ffffff/send-letter.png"/></button>
                </form>
            </footer>
        )
    }
}

export default Footer;