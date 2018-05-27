import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL } from '../constants/authentification';

const initialState = {
    id: null,
    username: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS: {
            console.log(action.type)
            return state;
        }

        case LOGIN_FAIL:
            console.log(action.type)
            return state;

        default:
            return state;
    }
}
