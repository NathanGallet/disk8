import { applyMiddleware, createStore } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers';
import saga from './middleware'

const history = createHistory();

const configureStore = () => {

    const myRouterMiddleware = routerMiddleware(history);
    const sagaMiddleware     = createSagaMiddleware();

    const store = createStore(
        reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(myRouterMiddleware, sagaMiddleware)
    );

    // Run the saga
    sagaMiddleware.run(saga);

    return store;
}

export {history, configureStore};
