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
                            <div key={index}>
                                <p key={index}> <i>{informations.author}:</i> {informations.message} </p>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

const styles = theme => ({
});

export default withStyles(styles)(MessageBoard);
