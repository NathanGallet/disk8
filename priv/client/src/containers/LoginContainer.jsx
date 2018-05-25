import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';

class LoginContainer extends Component {

    submitForm() {
        console.log('pseudo');
    }
    changePseudo() {
        console.log('pseudo');
    }

    render () {
        return (
            <div>
                <form onSubmit={this.submitForm()}>
                    <input
                        placeholder = "pseudo"
                        type        = "text"
                        onChange    = {this.changePseudo} />

                    <Button className={this.props.classes.button} variant="raised" color="primary">
                        Send
                        <Icon className={this.props.classes.rightIcon}>send</Icon>
                    </Button>
                </form>
            </div>
        );
    }
}

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    }
});

export default withStyles(styles)(LoginContainer);
