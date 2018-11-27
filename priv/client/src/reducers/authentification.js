import { KEY_PAIR_CREATED, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN } from '../constants/authentification';
import Auth from '../utils/auth';
import { isNull } from 'lodash';

// Check information in the local storage
let user = Auth.getUserInfo('userInformations');
let keys = Auth.getUserInfo('keyPair');

// Initial conditions
const initialState = {
    userId     : !isNull(user) ? user.id : null,
    userName   : !isNull(user) ? user.name : null,
    publicKey  : !isNull(keys) ? keys.publicKey : null,
    privateKey : !isNull(keys) ? keys.privateKey : null,
    error      : null
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

        case KEY_PAIR_CREATED: {
            return {
                ...state,
                privateKey: action.payload.privateKey,
                publicKey: action.payload.publicKey
            }
        }

        default:
            return state;
    }
}
