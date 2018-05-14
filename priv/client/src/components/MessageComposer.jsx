import React, { Component } from 'react';
import Immutable from 'immutable';

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

    handleKeyPress(event) {
        if(event.key == 'Enter') {
            event.preventDefault();
            this.props.sendMessage(Immutable.fromJS(this.state.message));
            event.target.value = '';
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.sendMessage(this.state.message)
        event.target.value = '';
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
