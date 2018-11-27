import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import {
    loginSuccess,
    loginFailure,
    keyPairCreated
} from '../actions/authentification';
import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from '../constants/authentification';
import Auth from '../utils/auth';
import User from '../requests/User';
import Crypto from '../utils/crypto';

// Worker Saga: will be fired on LOGIN actions
function* createUser(action) {
    try {

        // parameters
        let parameters = {
            user: {
                name: action.username
            }
        };

        // Call API to create user
        let user = yield call(User.create, parameters);

        // Generate key pair
        let keys = yield call(Crypto.generateKeys, null);

        // Set to local storage
        Auth.setUserInfo(user.data, true, 'userInformations')
        Auth.setUserInfo(keys, true, 'keyPair');

        // Update the state with the token
        yield put(loginSuccess(user.data));

        // Update the state with keys
        yield put(keyPairCreated(keys.privateKey, keys.publicKey));

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
export function* watchLoginUser () {
    yield takeLatest(LOGIN, createUser);
}
