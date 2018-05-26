import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL
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
        informationsUser
    };
}

function loginFailure(error) {
    return {
        type: LOGIN_FAILURE,
        error
    };
}
export {
    login,
    loginSuccess,
    loginFailure
};
