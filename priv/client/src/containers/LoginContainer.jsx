import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import * as actions from '../actions/authentification';

class LoginContainer extends Component {
    constructor (props) {
        super();
        this.state = {
            username: ''
        };
        this.handleChange   = this.handleChange.bind(this);
        this.submitForm     = this.submitForm.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    submitForm() {
        console.log(this.state.username)
    }

    handleChange(event) {
        this.setState({username: event.target.value});
    }

    handleKeyPress(event) {
        if(event.key != 'Enter') {
            return;
        }

        this.submitForm(this.state.username, event)
    }

    render () {
        return (
            <div>
                <TextField
                    id           = "pseudo"
                    label        = "Pseudonym"
                    className    = {this.props.classes.textField}
                    type         = "text"
                    autoComplete = "username"
                    margin       = "normal"
                    onKeyPress  = {this.handleKeyPress}
                    onChange    = {this.handleChange}
                />
            </div>
        );
    }
}

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

export default withStyles(styles)(LoginContainer);
