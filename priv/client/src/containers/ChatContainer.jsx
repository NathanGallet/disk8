import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import Button                 from '@material-ui/core/Button';
import TextField              from '@material-ui/core/TextField';
import { withStyles }         from '@material-ui/core/styles';
import Grid                   from '@material-ui/core/Grid';
import { withSnackbar }       from 'notistack';

import * as actions                                             from '../actions/chat';
import { MessageBoard, MessageComposer, UserList, ChannelList } from '../components';
import Sock8                                                    from '../utils/Socket';
import { DEFAULT_CHANNEL }                                      from '../constants/constants';
import LocalStorage                                             from '../utils/LocalStorage';
import CryptedDisk8                                             from '../utils/Crypto';
import { getUserPublicKey }                                     from '../utils/Helper';

// TODO: use grid to layout the chat properly
class ChatContainer extends Component {

    constructor (props) {
        super();
        this.state = {
            names: []
        };
    }

    componentDidMount() {
        // Create connexion socket and join default channel
        Sock8.createSocket(this.props.token);
        Sock8.joinChannel(DEFAULT_CHANNEL);
        Sock8.initPresence();
        Sock8.pushNewUser(true);

        // bind this to displayMessage
        this.displayMessage = this.displayMessage.bind(this);

        // Every message including message sent by the user will
        // be received and display by this function
        Sock8.onMessagePushed(this.displayMessage);
        Sock8.onNewUser(this.props.registerNewUser);

        // Watch user connections
        Sock8.getPresence()
             .onSync(() => this.listUsers())
    }

    displayMessage(encrypted_message, author) {
        const public_key = getUserPublicKey(author, this.props.users_informations);

        CryptedDisk8
               .descryptMessage(encrypted_message, this.props.private_key, public_key)
               .then((message, author) => {
                   this.props.displayMessage(message)
               })
    }

    listUsers() {
        let names = new Set();
        Sock8.getPresence().list((name) => {
            names.add(name)
        })
        this.setState({ names: Array.from(names) })
    }

    cryptMessageAndPush(message) {
        let { private_key, public_key, users_informations, userid } = this.props;

        CryptedDisk8
             .encryptMessage(message, private_key, public_key, users_informations.password)
             .then((message) => Sock8.pushMessage(message, userid))
    }

    render () {
        const { classes, message_informations } = this.props;

        return (
            <Grid container spacing={16}>
                <Grid item xs={2}>
                    <ChannelList />
                </Grid>

                <Grid item xs={8}>
                    <MessageBoard
                        message_informations={message_informations} />
                    <MessageComposer
                        sendMessage={(message) => this.cryptMessageAndPush(message)} />
                </Grid>

                <Grid item xs={2}>
                    <UserList names={this.state.names} />
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
        message_informations: state.chat.message_informations,
        users_informations: state.chat.users_informations,
        userid: state.authentification.userid,
        user_name: state.authentification.user_name,
        token: state.authentification.token,
        private_key: state.authentification.private_key,
        public_key: state.authentification.public_key
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actions, dispatch)
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withSnackbar(ChatContainer)));
