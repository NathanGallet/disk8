import { combineReducers } from 'redux-immutable';

import chat from './chat';
import authentification from './authentification';

export default combineReducers({
    chat,
    authentification
});
