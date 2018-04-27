import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import rootSaga from './sagas';

const configureStore = () => {
    const sagaMiddleware  = createSagaMiddleware();
    const middleware = applyMiddleware(sagaMiddleware);

    const store = createStore(
        reducer,
        compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__())
    );
    sagaMiddleware.run(rootSaga);

    return store;
}

export default configureStore;
