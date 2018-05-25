import React from 'react';
import { Provider } from 'react-redux';
import { configureStore, history } from './store';
import { ChatContainer, LoginContainer } from './containers';

import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';

const store = configureStore();

// Provider wraps our root component
const routes = (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <PrivateRoute exact path="/" component={ChatContainer} />
                <Route path="/login" component={LoginContainer} />
            </Switch>
        </ConnectedRouter>
    </Provider>
);


export default routes;
