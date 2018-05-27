import { watchLoginUser } from './authentification';

export default function* rootSaga () {
    yield [
        watchLoginUser()
    ];
}
