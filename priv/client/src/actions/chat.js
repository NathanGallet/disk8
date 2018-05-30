import Sock8 from '../sockets/socket';
import {
    DISPLAY_MESSAGE,
    POST_MESSAGE,
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

export {
    displayMessage,
    postMessage
};
