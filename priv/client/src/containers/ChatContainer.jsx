import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import * as actions from '../actions/chat';
import { MessageBoard, MessageComposer, UserList } from '../components';
import { Sock8 } from '../sockets';
import { DEFAULT_CHANNEL } from '../utils/config';
import Auth from '../utils/auth';

// TODO: use grid to layout the chat properly
class ChatContainer extends Component {

    componentDidMount() {
        console.log('User Informations stored : ', Auth.getUserInfo('userInfo'))

        /* Sock8.createSocket()
         * Sock8.joinChannel(DEFAULT_CHANNEL)
         * Sock8.pushMessage("coucou")
         * Sock8._pushMessage(this.props.postMessage) */
    }

    render () {
        const { classes, message, postMessage } = this.props;

        return (
            <Grid container spacing={16}>
                <Grid item xs={4}>
                    <UserList />
                </Grid>

                <Grid item xs={8}>
                    <MessageBoard
                        messages={message} />
                    <MessageComposer
                        sendMessage={postMessage} />
                </Grid>
            </Grid>
        );
    }
}

const styles = theme => ({
    chatContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    messageContainer: {
        display: 'flex',
        flexDirection: 'column '
    }
});

const mapStateToProps = state => {
    return {
        message: state.chat.message
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actions, dispatch)
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ChatContainer));
