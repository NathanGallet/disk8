import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';

class MessageComposer extends Component {

    constructor (props) {
        super();
        this.state = {
            message: ''
        };
        this.handleChange   = this.handleChange.bind(this);
        this.handleSubmit   = this.handleSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(event) {
        this.setState({message: event.target.value});
    }

    sendMessage(message, event) {
        // Don't dispatch anything if the message is empty
        if (isEmpty(message)) {
            return;
        }

        // Prevent default, reset state and dispatch message
        event.preventDefault();
        this.props.sendMessage(message);
        event.target.value = ''; // TODO : FIX, don't clear value on enter pressed
        this.setState({message: ''});
    }

    handleKeyPress(event) {
        // Dispatch just for Enter key
        if(event.key != 'Enter') {
            return;
        }

        this.sendMessage(this.state.message, event)
    }

    handleSubmit(event) {
        this.sendMessage(this.state.message, event)
    }

    render () {

        const { classes } = this.props;

        return (
            <div className={classes.container}>

                <TextField
                    label      = "Press enter to send message"
                    margin     = "normal"
                    onKeyPress = {this.handleKeyPress}
                    onChange   = {this.handleChange}
                    className  = {classes.composer}
                    fullWidth
                />

                <Button
                    variant    = "fab"
                    color      = "primary"
                    aria-label = "add"
                    className  = {classes.button}
                    onClick    = {this.handleSubmit} >

                    <SendIcon />
                </Button>
            </div>
        );
    }
}
const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: '65%',
        position: 'absolute',
        bottom: '20px'
    },

    button: {
        margin: theme.spacing.unit
    }
});


export default withStyles(styles)(MessageComposer);
