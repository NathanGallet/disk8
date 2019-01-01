import {
    watchSignUpUser,
    watchLoginUser
} from './authentification';

export default function* rootSaga () {
    yield [
        watchSignUpUser(),
        watchLoginUser()
    ];
}
