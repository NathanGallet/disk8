import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

class MessageBoard extends Component {

    render () {
        const { messagesInformations, classes } = this.props;
        return (
            <div>
                {
                    messagesInformations.map((informations, index) => {
                        return (
                            <p key={index}> {informations.author}: {informations.message} </p>
                        );
                    })
                }
            </div>
        );
    }
}

const styles = theme => ({
    talkBubble: {
        color: 'blue'
    },

    triRight: {
        backgroundColor: 'red'
    }
});

export default withStyles(styles)(MessageBoard);
