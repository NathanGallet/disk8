import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link }               from 'react-router-dom';
import { withSnackbar }       from 'notistack';
import Button                 from '@material-ui/core/Button';
import TextField              from '@material-ui/core/TextField';
import { withStyles }         from '@material-ui/core/styles';
import Grid                   from '@material-ui/core/Grid';

import * as actions     from '../actions/authentification';
import { trim, isNull } from 'lodash';

class LoginContainer extends Component {

    constructor (props) {
        super();

        this.handleButtonPressed  = this.handleButtonPressed.bind(this);
        this.handleChangePseudo   = this.handleChangePseudo.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    handleChangePseudo(event) {
        this.setState({name: trim(event.target.value)});
    }

    handleChangePassword(event) {
        this.setState({password: trim(event.target.value)});
    }

    handleButtonPressed() {
        this.props.login(this.state)
    }

    // TODO: should not put the notification here x)
    componentDidUpdate() {
        if (isNull(this.props.error)) {
            return;
        }

        this.props.enqueueSnackbar(this.props.error, {variant: 'error'})
        this.props.resetError();
    }

    render () {
        const { classes } = this.props
        return (
            <Grid
                className  = {classes.container}
                alignItems = 'center'
                justify    = 'center'
                spacing    = {16}
                container >
                <Grid
                    direction  = "column"
                    justify    = "center"
                    alignItems = "center"
                    container >
                    <TextField
                        id           = "pseudo"
                        label        = "Pseudonym"
                        className    = {classes.textField}
                        type         = "text"
                        autoComplete = "username"
                        margin       = "normal"
                        onChange     = {this.handleChangePseudo} />
                    <TextField
                        label        = "Password"
                        className    = {classes.textField}
                        type         = "password"
                        autoComplete = "current-password"
                        margin       = "normal"
                        onChange     =  {this.handleChangePassword} />
                    <Button
                        id        = "button"
                        variant   = "contained"
                        color     = "secondary"
                        className = {classes.button}
                        onClick   = {this.handleButtonPressed} >
                        Login
                    </Button>
                </Grid>

                <Link
                    className = {classes.button}
                    to        ="/signup">
                    Signup
                </Link>
            </Grid>
        );
    }
}

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    button: {
        marginTop: theme.spacing.unit,
    },
    progress: {
        margin: theme.spacing.unit,
    },
});

const mapStateToProps = state => {
    return {
        error: state.authentification.error
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actions, dispatch)
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withSnackbar(LoginContainer)));
