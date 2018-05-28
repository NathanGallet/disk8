import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import { withStyles } from '@material-ui/core/styles';

class UserList extends Component {

    constructor(props) {
        super();
        // TODO: to remove
        var userForTest = [
            { key: 0, name: 'nathan'},
            { key: 1, name: 'ayla'},
            { key: 2, name: 'thib'}
        ]

        this.state = { users: userForTest }
    }

    render () {
        const { classes } = this.props;

        return (
            <List className={classes.root}>
            {this.state.users.map( user => (
                <ListItem key={user.key} dense button className={classes.listItem}>
                    <ListItemText primary={`${user.name}`} />
                    <ListItemSecondaryAction>
                        <IconButton aria-label="Comments">
                            <CommentIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
            </List>
        );
    }
}

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    }
});

export default withStyles(styles)(UserList);
