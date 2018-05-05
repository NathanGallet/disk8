import {
    POST_MESSAGE,
} from '../constants/chat';

function postMessage(message) {
    return {
        type: POST_MESSAGE,
        message
    };
}

export { postMessage };
