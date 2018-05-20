import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux'
import reducer from './reducers';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();
const myRouterMiddleware = routerMiddleware(history);

const configureStore = () => {
    const store = createStore(
        reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(myRouterMiddleware)
    );

    return store;
}

export {history, configureStore};
