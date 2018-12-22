import { UserRequests } from '../requests';

import {
    SIGNUP,
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    KEY_PAIR_CREATED,
    TOKEN_CREATED
} from '../constants/authentification';


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

function login(username) {
    return {
        type: LOGIN,
        username
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
