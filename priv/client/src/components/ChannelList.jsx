import React, { Component } from 'react';
import { withStyles }       from '@material-ui/core/styles';

class ChannelList extends Component {

    render () {
        return (
            <div>
                <p>
                    Channel Lists:
                </p>
            </div>
        );
    }
}

const styles = theme => ({
});

export default withStyles(styles)(ChannelList);
