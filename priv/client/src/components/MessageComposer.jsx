import React, { Component } from 'react';

class MessageComposer extends Component {

    constructor (props) {
        super();
        this.state = {
            message: ''
        };
    }

    sendMessage() {
        console.log(this.state.message)
    }

    test(message) {
        console.log(message)
    }

    render () {

        return (
            <div className="container">
                <input
                    type        = "text"
                    placeholder = "Enter your message"
                    onChange    = {(msg) => this.test(msg)}
                />
                <button
                    type = "button"
                    onClick = {this.sendMessage()} >
                    Envoyer
                </button>

            </div>
        );
    }
}

export default MessageComposer;
