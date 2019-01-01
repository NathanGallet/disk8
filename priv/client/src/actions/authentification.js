import { UserRequests } from '../requests';

import {
    SIGNUP,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    KEY_PAIR_CREATED,
    TOKEN_CREATED
} from '../constants/authentification';


function login(user_informations) {
    return {
        type: LOGIN,
        payload: {
            name: user_informations.name,
            password: user_informations.password
        }
    };
}

function loginSuccess(user_informations) {
    return {
        type: LOGIN_SUCCESS,
        payload: user_informations
    };
}

function loginFailure(error) {
    return {
        type: LOGIN_FAILURE,
        payload: error
    };
}


function signup(user_informations) {
    return {
        type: SIGNUP,
        payload: {
            name: user_informations.username,
            password: user_informations.password,
            public_key: user_informations.public_key,
            private_key: user_informations.private_key,
        }
    };
}

function signupSuccess(user_informations) {
    return {
        type: SIGNUP_SUCCESS,
        payload: user_informations
    };
}

function signupFailure(error) {
    return {
        type: SIGNUP_FAILURE,
        payload: error
    };
}

function keyPairCreated(private_key, public_key) {
    return {
        type: KEY_PAIR_CREATED,
        payload: {
            private_key,
            public_key
        }
    };
}

function tokenCreated(token) {
    return {
        type: TOKEN_CREATED,
        payload: {
            token
        }
    };
}

export {
    signup,
    login,
    loginSuccess,
    loginFailure,
    keyPairCreated,
    tokenCreated
};
