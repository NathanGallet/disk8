import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from '../constants/authentification';
import User from '../requests/User';

// Worker Saga: will be fired on LOGIN actions
function* createUser(action) {
    try {
        const user = yield call(User.create, { user: action.payload.username });
        console.log(user)
        yield put({type: LOGIN_SUCCESS, user: user});
    } catch (e) {
        yield put({type: LOGIN_FAIL, message: e.message});
    }
}


/*
   Starts createUser on each dispatched `LOGIN` action.
   Allows concurrent fetches of user.
 */
export function* watchLoginUser () {
    yield takeLatest(LOGIN, createUser);
}
