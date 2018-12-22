import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import {
    loginSuccess,
    loginFailure,
    keyPairCreated,
    tokenCreated
} from '../actions/authentification';

import {
    SIGNUP
} from '../constants/authentification';

import LocalStorage from '../utils/LocalStorage';
import User from '../requests/User';

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
        let user = yield call(User.create, parameters);

        let { id, token } = user.user;
        let keys = {
            public_key,
            private_key
        };
        let user_informations = {
            id,
            name
        };

        // Set to local storage
        LocalStorage.setUserInfo(user_informations, true, 'userInformations');
        LocalStorage.setUserInfo(keys, true, 'keyPair');
        LocalStorage.setUserInfo(token, true, 'token');

        // Update the state with user informations
        yield put(loginSuccess(user.user));

        // Update the state with keys
        yield put(keyPairCreated(keys.private_key, keys.public_key));

        // Update the state with token
        yield put(tokenCreated(token));

        // Redirect to /
        yield put(push('/'));

    } catch (e) {
        yield put(loginFailure(e));
    }
}

/*
   Starts createUser on each dispatched `LOGIN` action.
   Allows concurrent fetches of user.
 */
export function* watchSignUpUser () {
    yield takeLatest(SIGNUP, createUser);
}
