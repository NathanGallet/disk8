import { forEach } from 'lodash';

const getUserPublicKey = (author, users_list) => {
    let yolo = {};
    forEach(users_list, user => {
        if (user.user == author) {
            yolo = user;
            return;
        }
    })

    return yolo;
}

export {
    getUserPublicKey
};
