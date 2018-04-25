import Immutable from 'immutable';
import { POST_MESSAGE } from '../constants/chat';

const initialState = Immutable.Map();

export default (state = initialState, action) => {
    switch (action.type) {
        case POST_MESSAGE: {
            return state.merge({ informations: informations });
        }

        default:
            return state;
    }
}
