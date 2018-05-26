import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import * as actions from '../actions/chat';
import { MessageBoard, MessageComposer, UserList } from '../components';
import { Sock8 } from '../sockets';
import { DEFAULT_CHANNEL } from '../utils/config';
import { Link } from 'react-router-dom';

class ChatContainer extends Component {

    componentDidMount() {
        /* Sock8.createSocket()
         * Sock8.joinChannel(DEFAULT_CHANNEL)
         * Sock8.pushMessage("coucou")
         * Sock8._pushMessage(this.props.postMessage) */
    }

    render () {
        return (
            <div className="ChatContainer">
                <div className="MessageBoard">
                    <MessageBoard
                        messages={this.props.message} />
                </div>
                <div className="MessageComposer">
                    <MessageComposer
                        sendMessage={this.props.postMessage} />
                </div>
                <div className="UserList">
                    <UserList />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        message: state.chat.message
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
