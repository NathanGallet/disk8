import React, { Component } from 'react';
import { MessageBoard, MessageComposer, UserList } from '../components'

// Manage chat
class ChatContainer extends Component {


    render () {
        return (
            <div>
                <MessageBoard />
                <MessageComposer />
                <UserList />
            </div>
        );
    }
}

export default ChatContainer;
