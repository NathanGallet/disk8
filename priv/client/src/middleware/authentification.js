import { call, put, takeLatest } from 'redux-saga/effects';
import { push }                  from 'react-router-redux';

import {
    loginSuccess,
    loginFailure,
    signupSuccess,
    signupFailure,
    keyPairCreated,
    tokenCreated
} from '../actions/authentification';
import {
    SIGNUP,
    LOGIN
}                   from '../constants/authentification';
import LocalStorage from '../utils/LocalStorage';
import User         from '../requests/User';
import Session      from '../requests/Session';

// Worker Saga: will be fired on SIGNUP actions
function* createUser(action) {
    try {
        let { name, password, public_key, private_key } = action.payload
        let parameters = {
            user: {
                name,
                password,
                public_key,
                private_key
            }
        };

        // Call API to create user
        let response = yield call(User.create, parameters);

        let { id, token } = response.user;
        let keys = {
            public_key,
            private_key
        };
        let user_informations = {
            id,
            name,
            password
        };

        // Set to local storage
        LocalStorage.setUserInfo(user_informations, true, 'user_informations');
        LocalStorage.setUserInfo(keys, true, 'keys');
        LocalStorage.setUserInfo(token, true, 'token');

        // Update the state with user informations
        yield put(signupSuccess(response.user));

        // Update the state with keys
        yield put(keyPairCreated(keys.private_key, keys.public_key));

        // Update the state with token
        yield put(tokenCreated(token));

        // Redirect to /
        yield put(push('/'));

    } catch (error) {
        yield put(signupFailure(error));
    }
}

function* login(action) {
    try {
        let { name, password } = action.payload
        let parameters = {
            user: {
                name,
                password
            }
        };

        // Call API to login
        let response = yield call(Session.login, parameters);

        let { id, token } = response.user;
        let user_informations = {
            id,
            name,
            password
        };

        // Set to local storage
        LocalStorage.setUserInfo(user_informations, true, 'user_informations');
        LocalStorage.setUserInfo(token, true, 'token');

        // Update the state with user informations
        yield put(loginSuccess(response.user));

        // Update the state with token
        yield put(tokenCreated(token));

        // Redirect to /
        yield put(push('/'));

    } catch (error) {
        yield put(loginFailure(error));
    }
}

/*
   Starts createUser on each dispatched `LOGIN` action.
   Allows concurrent fetches of user.
 */
export function* watchSignUpUser() {
    yield takeLatest(SIGNUP, createUser);
}

export function* watchLoginUser() {
    yield takeLatest(LOGIN, login);
}
