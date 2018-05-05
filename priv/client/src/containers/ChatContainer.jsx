import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import * as actions from '../actions/chat';
import { Socket } from "phoenix"

import { MessageBoard, MessageComposer, UserList } from '../components'

class ChatContainer extends Component {

    // TODO: suppress, socket will be placed in an other part of the code
    componentDidMount() {
        const ROOT_SOCKET = 'ws://localhost:4000';
        let socket = new Socket(`${ROOT_SOCKET}/socket`);

        socket.connect();
        let channel = socket.channel("room:lobby", {});

        channel.join()
            .receive("ok", resp => { console.log("Joined successfully", resp) })
            .receive("error", resp => { console.log("Unable to join", resp) })
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
        message: state.getIn(['chat', 'message'], Immutable.List())
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
