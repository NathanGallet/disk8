import { combineReducers } from 'redux';

import chat from './chat';
import authentification from './authentification';

export default combineReducers({
    chat,
    authentification
});
