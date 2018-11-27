import { UserRequests } from '../requests';

import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    KEY_PAIR_CREATED
} from '../constants/authentification';


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
    login,
    loginSuccess,
    loginFailure,
    keyPairCreated
};
