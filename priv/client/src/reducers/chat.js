import {
    DISPLAY_MESSAGE,
    POST_MESSAGE
} from '../constants/chat';
import { concat } from 'lodash';

const initialState = {
    message_informations: []
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

        default:
            return state;
    }
}
