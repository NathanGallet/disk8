import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import * as actions from '../actions/chat';
import { MessageBoard, MessageComposer, UserList } from '../components';
import Sock8 from '../sockets/socket';
import { DEFAULT_CHANNEL } from '../utils/config';
import Auth from '../utils/auth';

// TODO: use grid to layout the chat properly
class ChatContainer extends Component {
    constructor (props) {
        super();
        this.state = { userInfo: null };
    }


    componentDidMount() {
        // Get user info in the local storage
        let userId   = this.state.userId   = Auth.getUserInfo('userInfo').id;
        let userName = this.state.userName = Auth.getUserInfo('userInfo').name;

        // Create connexion socket and join default channel
        Sock8.createSocket();
        Sock8.joinChannel(DEFAULT_CHANNEL);

        // Every message including message sent by the user will be received and display by this function
        Sock8.onMessagePushed(this.props.displayMessage)
    }

    render () {
        const { classes, messagesInformations, postMessage } = this.props;

        return (
            <Grid container spacing={16}>
                <Grid item xs={4}>
                    <UserList />
                </Grid>

                <Grid item xs={8}>
                    <MessageBoard
                        messagesInformations={messagesInformations} />
                    <MessageComposer
                        sendMessage={(message) => postMessage(message, this.state.userId)} />
                </Grid>
            </Grid>
        )
    }
}

// Useless but probably need it to layout properly components
const styles = theme => ({
});

const mapStateToProps = state => {
    return {
        messagesInformations: state.chat.messagesInformations
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actions, dispatch)
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ChatContainer));
