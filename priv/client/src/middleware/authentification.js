import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import {
    loginSuccess,
    loginFailure
} from '../actions/authentification';
import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from '../constants/authentification';
import Auth from '../utils/auth';
import User from '../requests/User';

// Worker Saga: will be fired on LOGIN actions
function* createUser(action) {
    try {
        const user = yield call(User.create,  action.payload);

        // Set to local storage
        Auth.setUserInfo(user.data, true, 'userInfo')

        // Update the state with the token
        yield put(loginSuccess(user.data));

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
