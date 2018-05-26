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

// TODO: use grid to layout the chat properly
class ChatContainer extends Component {

    componentDidMount() {
        /* Sock8.createSocket()
         * Sock8.joinChannel(DEFAULT_CHANNEL)
         * Sock8.pushMessage("coucou")
         * Sock8._pushMessage(this.props.postMessage) */
    }

    render () {
        const { classes, message, postMessage } = this.props;

        return (
            <div className={classes.chat}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <MessageBoard
                            messages={message} />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <MessageComposer
                        sendMessage={postMessage} />
                </Grid>
                <Grid item xs={12}>
                    <UserList />
                </Grid>
            </div>
        );
    }
}

const styles = theme => ({
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
