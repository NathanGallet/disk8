import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL } from '../constants/authentification';

const initialState = {
    userId: null,
    userName: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS: {
            return {
                ...state,
                userName: action.payload.name,
                userId : action.payload.id
            }
        }

        case LOGIN_FAIL: {
            return {
                ...state,
                error: action.payload.error
            }
        }

        default:
            return state;
    }
}
