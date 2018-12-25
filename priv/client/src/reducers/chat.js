import {
    DISPLAY_MESSAGE,
    POST_MESSAGE,
    NEW_USER
} from '../constants/chat';
import { concat } from 'lodash';

const initialState = {
    message_informations: [],
    users_informations: new Set()
};

export default (state = initialState, action) => {
    switch (action.type) {
        case DISPLAY_MESSAGE: {
            // all the informations about the message
            let informations = {
                author: action.author,
                message: action.message
            }
            return {
                ...state,
                message_informations: concat(state.message_informations, informations)
            }
        }
        case POST_MESSAGE: {
            return state;
        }

        case NEW_USER: {
            return {
                ...state,
                user_informations: state.users_informations.add({
                    user: action.user,
                    public_key: action.public_key
                })
            }
        }

        default:
            return state;
    }
}
