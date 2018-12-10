import { UserRequests } from '../requests';

import {
    SIGNUP,
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    KEY_PAIR_CREATED
} from '../constants/authentification';


function signup(informationsUser) {
    return {
        type: SIGNUP,
        payload: informationsUser
    };
}


function login(username) {
    return {
        type: LOGIN,
        username
    };
}

function loginSuccess(informationsUser) {
    return {
        type: LOGIN_SUCCESS,
        payload: informationsUser
    };
}

function loginFailure(error) {
    return {
        type: LOGIN_FAILURE,
        payload: error
    };
}

function keyPairCreated(privateKey, publicKey) {
    return {
        type: KEY_PAIR_CREATED,
        payload: {
            privateKey,
            publicKey
        }
    }
}

export {
    signup,
    login,
    loginSuccess,
    loginFailure,
    keyPairCreated
};
