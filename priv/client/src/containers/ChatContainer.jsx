import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import * as chatActionCreators from '../actions/chat';

import { MessageBoard, MessageComposer, UserList } from '../components'


class ChatContainer extends Component {
    render () {
        return (
            <div className="ChatContainer">
                <div className="MessageBoard">
                    <MessageBoard />
                </div>
                <div className="MessageComposer">
                    <MessageComposer />
                </div>
                <div className="UserList">
                    <UserList />
                </div>
            </div>
        );
    }
}

// We can read values from the state thanks to mapStateToProps
function mapStateToProps(state) {
    return {
        informations: state.getIn(['informations', 'list'], Immutable.List()).toJS(),
    }
}

// We can dispatch actions to the reducer and sagas
function mapDispatchToProps(dispatch) {
    return {
        chatActions: bindActionCreators(chatActionCreators, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
