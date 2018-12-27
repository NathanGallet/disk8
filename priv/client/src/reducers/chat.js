import {
    DISPLAY_MESSAGE,
    NEW_USER
} from '../constants/chat';
import { concat, filter, matches, isEmpty } from 'lodash';

const initialState = {
    message_informations: [],
    users_informations: []
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

        case NEW_USER: {
            let { user, public_key } = action;
            let user_informations = {
                user,
                public_key
            };

            if (isEmpty(filter(state.users_informations, matches(user_informations)))) {
                state.users_informations.push(user_informations);
            }

            return state;
        }

        default:
            return state;
    }
}
