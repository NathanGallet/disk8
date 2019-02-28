import {
    DISPLAY_MESSAGE,
    NEW_USER
} from '../constants/chat';

const displayMessage = (message, author) => {
    return {
        type: DISPLAY_MESSAGE,
        message,
        author
    };
}

const registerNewUser = (user, public_key) => {
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
