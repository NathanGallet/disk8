import React, { Component } from 'react';
import Immutable from 'immutable';
import { isEmpty } from 'lodash';

class MessageComposer extends Component {

    constructor (props) {
        super();
        this.state = {
            message: ''
        };
        this.handleChange   = this.handleChange.bind(this);
        this.handleSubmit   = this.handleSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(event) {
        this.setState({message: event.target.value});
    }

    sendMessage(message, event) {
        // Don't dispatch anything if the message is empty
        if (isEmpty(message)) {
            return;
        }

        // Prevent default, reset state and dispatch message
        event.preventDefault();
        this.props.sendMessage(Immutable.fromJS(message));
        event.target.value = ''; // TODO : FIX, don't clear value on enter pressed
        this.setState({message: ''});
    }

    handleKeyPress(event) {
        // Dispatch just for Enter key
        if(event.key != 'Enter') {
            return;
        }

        this.sendMessage(this.state.message, event)
    }

    handleSubmit(event) {
        this.sendMessage(this.state.message, event)
    }

    render () {

        return (
            <div className="container">
                <input
                    type        = "text"
                    placeholder = "Enter your message"
                    onKeyPress  = {this.handleKeyPress}
                    onChange    = {this.handleChange} />

                <button onClick={this.handleSubmit}> Envoyer </button>
            </div>
        );
    }
}

export default MessageComposer;
