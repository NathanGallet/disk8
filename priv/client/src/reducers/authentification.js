import {
    KEY_PAIR_CREATED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN,
    SIGNUP,
    TOKEN_CREATED
} from '../constants/authentification';
import LocalStorage from '../utils/LocalStorage';
import { isNull } from 'lodash';

// Check information in the local storage
let user  = LocalStorage.getUserInfo('user_informations');
let keys  = LocalStorage.getUserInfo('keys');
let token = LocalStorage.getUserInfo('token');

// Initial conditions
const initialState = {
    userid      : !isNull(user) ? user.id : null,
    token       : !isNull(token) ? token : null,
    user_name   : !isNull(user) ? user.name : null,
    public_key  : !isNull(keys) ? keys.public_key : null,
    private_key : !isNull(keys) ? keys.private_key : null,
    error       : null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS: {
            return {
                ...state,
                user_name: action.payload.name,
                userid : action.payload.id
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
                private_key: action.payload.private_key,
                public_key: action.payload.public_key
            }
        }

        case TOKEN_CREATED: {
            return {
                ...state,
                token: action.payload.token
            }
        }

        default:
            return state;
    }
}
