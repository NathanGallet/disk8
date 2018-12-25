import Sock8 from '../sockets/socket';
import {
    DISPLAY_MESSAGE,
    POST_MESSAGE,
    NEW_USER
} from '../constants/chat';

function displayMessage(message, author) {
    return {
        type: DISPLAY_MESSAGE,
        message,
        author
    };
}

function postMessage(message, id) {
    return {
        type: POST_MESSAGE,
        payload: Sock8.pushMessage(message, id)
    }
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
    postMessage,
    registerNewUser
};
