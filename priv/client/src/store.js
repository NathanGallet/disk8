import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import rootSaga from './sagas';

const configureStore = () => {
    const sagaMiddleware  = createSagaMiddleware();

    const store = createStore(
        reducer,
        applyMiddleware(sagaMiddleware)
    );
    sagaMiddleware.run(rootSaga);

    return store;
}

export default configureStore;
