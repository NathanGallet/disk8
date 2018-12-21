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
import { DEFAULT_CHANNEL } from '../constants/constants';
import LocalStorage from '../utils/LocalStorage';

// TODO: use grid to layout the chat properly
class ChatContainer extends Component {

    componentDidMount() {
        // Get token
        let token = LocalStorage.getUserInfo('token')

        // Create connexion socket and join default channel
        Sock8.createSocket({token: token})
        Sock8.joinChannel(DEFAULT_CHANNEL);

        // Every message including message sent by the user will be received and display by this function
        Sock8.onMessagePushed(this.props.displayMessage)
    }

    render () {
        const { classes, message_informations, postMessage, userid } = this.props;

        return (
            <Grid container spacing={16}>
                <Grid item xs={4}>
                    <UserList />
                </Grid>

                <Grid item xs={8}>
                    <MessageBoard
                        message_informations={message_informations} />
                    <MessageComposer
                        sendMessage={(message) => postMessage(message, userid)} />
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
        message_informations : state.chat.message_informations,
        userid               : state.authentification.userid,
        user_name            : state.authentification.user_name
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actions, dispatch)
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ChatContainer));
