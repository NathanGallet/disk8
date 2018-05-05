import React, { Component } from 'react';

class MessageBoard extends Component {

    render () {
        const { messages } = this.props;
        return (
            <div>
                { this.props.messages }
            </div>
        );
    }
}

export default MessageBoard;
