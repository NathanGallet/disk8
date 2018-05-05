import React, { Component } from 'react';

class MessageBoard extends Component {
    componentDidUpdate() {
       console.log('MessageBoard props', this.props);
    }

    componentDidMount() {
        console.log('MessageBoard props', this.props);
    }

    render () {
        return (
            <div>
                {this.props.messageToDisplay}
            </div>
        );
    }
}

export default MessageBoard;
