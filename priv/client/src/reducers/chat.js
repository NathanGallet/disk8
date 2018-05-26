import { POST_MESSAGE } from '../constants/chat';
import { concat } from 'lodash';

const initialState = {
    message: ['']
};

export default (state = initialState, action) => {
    switch (action.type) {
        case POST_MESSAGE: {
            return {
                ...state,
                message: concat(state.message, action.message)

            }
        }

        default:
            return state;
    }
}
