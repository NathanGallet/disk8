import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import * as actions from '../actions/chat';

import { MessageBoard, MessageComposer, UserList } from '../components'


class ChatContainer extends Component {
    componentDidMount() {
        console.log('state', this.state)
        console.log('props', this.props)
    }

    render () {
        return (
            <div className="ChatContainer">
                <div className="MessageBoard">
                    <MessageBoard
                        messageToDisplay={this.props.message} />
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
    console.log('mapStateToProps', state.getIn(['chat', 'message'], Immutable.List()).toJS())
    return {
        message: state.getIn(['chat', 'message'], Immutable.List()).toJS(),
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
