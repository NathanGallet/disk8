import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
        this.props.login(this.state.username)
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
        const { classes } = this.props
        return (
            <div>
                <TextField
                    id           = "pseudo"
                    label        = "Pseudonym"
                    className    = {classes.textField}
                    type         = "text"
                    autoComplete = "username"
                    margin       = "normal"
                    onKeyPress   = {this.handleKeyPress}
                    onChange     = {this.handleChange}
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

const mapStateToProps = state => {
    return {
        userId: state.authentification.userId,
        userName: state.authentification.userName
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actions, dispatch)
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LoginContainer));
