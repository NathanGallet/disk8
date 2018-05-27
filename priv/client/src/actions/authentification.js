import { UserRequests } from '../requests';

import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from '../constants/authentification';


function login(username) {
    return {
        type: LOGIN,
        payload: {
            username
        }
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
export {
    login,
    loginSuccess,
    loginFailure
};
