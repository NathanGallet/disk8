import React, { Component } from 'react';

class MessageBoard extends Component {

    render () {
        const { messages } = this.props;
        return (
            <div>
                {
                    messages
                        .map((message, i) => {
                            return (
                                <p key={i}> {message} </p>
                            );
                        })
                }
            </div>
        );
    }
}

export default MessageBoard;
