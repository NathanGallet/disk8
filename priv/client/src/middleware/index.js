import { watchSignUpUser } from './authentification';

export default function* rootSaga () {
    yield [
        watchSignUpUser()
    ];
}
