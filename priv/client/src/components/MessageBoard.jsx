import React, { Component } from 'react';
import { withStyles }       from '@material-ui/core/styles';

class MessageBoard extends Component {

    render () {
        const { message_informations, classes } = this.props;
        return (
            <div>
                {
                    message_informations.map((informations, index) => {
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
