import Sock8 from '../sockets/socket';
import {
    DISPLAY_MESSAGE,
    NEW_USER
} from '../constants/chat';

function displayMessage(message, author) {
    return {
        type: DISPLAY_MESSAGE,
        message,
        author
    };
}

function registerNewUser(user, public_key) {
    return {
        type: NEW_USER,
        user,
        public_key
    }
}

export {
    displayMessage,
    registerNewUser
};
