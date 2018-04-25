import {
    POST_MESSAGE,
} from '../constants/chat';

function postMessage(informations) {
    return {
        type: POST_MESSAGE,
        informations
    };
}

export {postMessage };
