import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import * as actions from '../actions/chat';

import { MessageBoard, MessageComposer, UserList } from '../components'

class ChatContainer extends Component {

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
