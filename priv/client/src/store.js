import { applyMiddleware, createStore, compose } from 'redux';
import createHistory                             from 'history/createBrowserHistory';
import { routerMiddleware }                      from 'react-router-redux'
import createSagaMiddleware                      from 'redux-saga'

import reducers from './reducers';
import saga     from './middleware'

const history = createHistory();

const configureStore = () => {

    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const myRouterMiddleware = routerMiddleware(history);
    const sagaMiddleware     = createSagaMiddleware();

    const store = createStore(
        reducers,
        composeEnhancer(applyMiddleware(myRouterMiddleware, sagaMiddleware))
    );

    // Run the saga
    sagaMiddleware.run(saga);

    return store;
}

export { history, configureStore };
