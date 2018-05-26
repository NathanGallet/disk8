import Immutable from 'immutable';
import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL } from '../constants/authentification';

const initialState = Immutable.Map({
    id: null,
    username: null
});

export default (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}