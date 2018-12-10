import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';

import * as actions from '../actions/authentification';

// For generating RSA keypair
var openpgp = require('openpgp')

class SignUpContainer extends Component {

    constructor (props) {
        super();
        this.state = {
            username: '',
            password1: '',
            password2: '',
            passwordOK: false,
            keyGenerationStatus: 0, //0=not generated / 1=generating / 2=generated
            publicKey: '',
            privateKey: '',
        };

        this.handleChangePseudo   = this.handleChangePseudo.bind(this);
        this.handleChangePw1   = this.handleChangePw1.bind(this);
        this.handleChangePw2   = this.handleChangePw2.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleButtonPressed = this.handleButtonPressed.bind(this);
    }


    handleChangePseudo(event) {
        this.setState({username: event.target.value});
    }

    handleChangePw1(event) {
        let pwd = event.target.value;
        if( pwd.length > 0 && pwd === this.state.password2 ){
            this.setState({passwordOK: true});
        } else {
        this.setState({passwordOK: false});
        }
        this.setState({password1: pwd});
    }

    handleChangePw2(event) {
        let pwd = event.target.value;
        if( pwd.length > 0 && pwd === this.state.password1 ){
            this.setState({passwordOK: true});
        } else {
            this.setState({passwordOK: false});
        }
        this.setState({password2: pwd});
    }

    handleKeyPress(event) {
        if(event.key != 'Enter') {
            return;
        }
        this.submitForm(this.state.username, event)
    }

    handleButtonPressed( event ) {

        if(this.state.keyGenerationStatus == 0 ){ // We need to generate the keys
            this.setState({
                keyGenerationStatus: 1,
            });
            var options = {
                userIds: [{ pseudo: this.state.pseudo }],
                numBits: 2048,                                            // RSA key size
                passphrase: this.state.password2         // protects the private key
            };
            openpgp.generateKey(options).then(function(key) {
                console.log("Done!");
                console.log(key.publicKeyArmored);
                this.setState({
                    privateKey: key.privateKeyArmored,
                    publicKey: key.publicKeyArmored,
                })
                // We don't use this for now
                // var revocationSignature = key.revocationSignature;
                this.setState({keyGenerationStatus: 2});
            }.bind(this));
        }
        else if (this.state.keyGenerationStatus == 2 ){ // Keys are generated, we need to submit to the server
            console.log("submit form !");
            this.props.signup(this.state);
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
                    direction="column"
                    justify="center"
                    alignItems="center"
                    container >
                    <TextField
                        id           = "pseudo"
                        label        = "Pseudonym"
                        className    = {classes.textField}
                        type         = "text"
                        autoComplete = "username"
                        margin       = "normal"
                        onKeyPress   = {this.handleKeyPress}
                        onChange     = {this.handleChangePseudo}
                    />
                    < TextField
                        id="password1"
                        label="Password"
                        className={classes.textField}
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        onChange     = {this.handleChangePw1}
                    />
                    < TextField
                        id="password2"
                        label="Password again"
                        className={classes.textField}
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        onChange     = {this.handleChangePw2}
                    />

                    <Button id="button"
                            variant="contained"
                            color="secondary"
                            disabled={!this.state.passwordOK || (this.state.keyGenerationStatus == 1)}
                            className={classes.button}
                            onClick={this.handleButtonPressed}
                    >
                        {this.state.keyGenerationStatus == 0 ? 'Generate keys' : this.state.keyGenerationStatus == 1 ? 'Generating keys...' :
                         'Submit ' }
                    </Button>


                    <CircularProgress
                        style={{ visibility: this.state.keyGenerationStatus == 1 ? "visible" : "hidden"}}
                        color="secondary"
                        className={classes.progress}
                    />


                    <Snackbar
                        open={this.state.keyGenerationStatus == 2}
                        message='RSA keys generated !'
                    />


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
        userId: state.authentification.userId,
        userName: state.authentification.userName
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actions, dispatch)
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SignUpContainer));
