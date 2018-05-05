import React, { Component } from 'react';

class MessageComposer extends Component {

    constructor (props) {
        super();
        this.state = {
            message: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({message: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.sendMessage(this.state.message)
    }

    render () {

        return (
            <div className="container">
                <input
                    type        = "text"
                    placeholder = "Enter your message"
                    onChange    = {this.handleChange} />
                <button onClick={this.handleSubmit}> Envoyer </button>
            </div>
        );
    }
}

export default MessageComposer;
