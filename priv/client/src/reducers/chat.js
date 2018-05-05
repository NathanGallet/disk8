import Immutable from 'immutable';
import { POST_MESSAGE } from '../constants/chat';

const initialState = Immutable.Map({
    message: ''
});

export default (state = initialState, action) => {
    switch (action.type) {
        case POST_MESSAGE: {
            return state.merge({
                message: action.message
            })
        }

        default:
            return state;
    }
}
