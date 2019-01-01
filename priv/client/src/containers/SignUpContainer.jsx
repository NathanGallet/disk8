import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import { size, trim, isNull } from 'lodash';
import { withSnackbar } from 'notistack';

import * as actions from '../actions/authentification';
import CryptedDisk8 from '../utils/crypto';
import { KEY_NOT_GENERATED, KEY_GENERATING, KEY_GENERATED } from '../constants/constants';

class SignUpContainer extends Component {

    constructor (props) {
        super();
        this.state = {
            username: '',
            password: '',
            password_verification: '',
            password_match: false,
            key_generation_status: KEY_NOT_GENERATED,
            public_key: '',
            private_key: '',
        };

        this.handleChangePseudo               = this.handleChangePseudo.bind(this);
        this.handleChangePassword             = this.handleChangePassword.bind(this);
        this.handleChangePasswordVerification = this.handleChangePasswordVerification.bind(this);
        this.handleButtonPressed              = this.handleButtonPressed.bind(this);
    }


    handleChangePseudo(event) {
        this.setState({username: trim(event.target.value)});
    }

    handleChangePassword(event) {
        let password = trim(event.target.value);
        this.setState({
            password,
            password_match: false
        });

        if(size(password) > 0 && password === this.state.password_verification) {
            this.setState({password_match: true});
        }
    }

    handleChangePasswordVerification(event) {
        let password_verification = trim(event.target.value);
        this.setState({
            password_verification,
            password_match: false
        });

        if(size(password_verification) > 0 && password_verification === this.state.password) {
            this.setState({password_match: true});
        }
    }

    componentDidUpdate() {
        if (isNull(this.props.error)) {
            return;
        }

        this.props.enqueueSnackbar(this.props.error, {variant: 'error'})
        this.props.resetError();
    }

    handleButtonPressed( event ) {
        switch (this.state.key_generation_status) {
            case KEY_NOT_GENERATED:
                this.setState({
                    key_generation_status: KEY_GENERATING,
                });

                CryptedDisk8.generateKeys(this.state.pseudo, this.state.pseudo)
                            .then(keys => {
                                this.setState({
                                    private_key: keys.private_key,
                                    public_key: keys.public_key,
                                    key_generation_status: KEY_GENERATED
                                })
                            })
                break;

            case KEY_GENERATED:
                this.props.signup(this.state);
                break;
        }
    }

    buttonLabel() {
        switch (this.state.key_generation_status) {
            case KEY_NOT_GENERATED:
                return 'Generate Keys';
            case KEY_GENERATING:
                return 'Generating keys...';
            case KEY_GENERATED:
                return 'Submit';
        }
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
                    <TextField
                        label        = "Password again"
                        className    = {classes.textField}
                        type         = "password"
                        autoComplete = "current-password"
                        margin       = "normal"
                        onChange     =  {this.handleChangePasswordVerification} />
                    <Button
                        id        = "button"
                        variant   = "contained"
                        color     = "secondary"
                        disabled  = {!this.state.password_match || (this.state.key_generation_status == KEY_GENERATING)}
                        className = {classes.button}
                        onClick   = {this.handleButtonPressed} >

                        { this.buttonLabel() }

                    </Button>
                    <CircularProgress
                        style     = {{ visibility: this.state.key_generation_status == KEY_GENERATING ? "visible" : "hidden"}}
                        color     = "secondary"
                        className = {classes.progress} />
                    <Snackbar
                        open    = {this.state.key_generation_status == KEY_GENERATED}
                        message = 'RSA keys generated !'/>
                </Grid>
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
        userid: state.authentification.userid,
        user_name: state.authentification.user_name,
        error: state.authentification.error
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actions, dispatch)
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withSnackbar(SignUpContainer)));
