import {
    DISPLAY_MESSAGE,
    POST_MESSAGE
} from '../constants/chat';
import { concat } from 'lodash';

const initialState = {
    message: ['']
};

export default (state = initialState, action) => {
    switch (action.type) {
        case DISPLAY_MESSAGE: {
            return {
                ...state,
                message: concat(state.message, action.message)

            }
        }
        case POST_MESSAGE: {
            console.log('state: ', state);
            console.log('action: ', action);
            return {
                ...state,
            }
        }

        default:
            return state;
    }
}
