import React                from 'react';
import { Provider }         from 'react-redux';
import { ConnectedRouter }  from 'react-router-redux';
import { Route, Switch }    from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import { configureStore, history }                        from './store';
import { SignUpContainer, ChatContainer, LoginContainer } from './containers';
import PrivateRoute                                       from './utils/PrivateRoute';

const store = configureStore();

// Provider wraps our root component
const routes = (
    <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route path="/signup" component={SignUpContainer} />
                    <Route path="/login" component={LoginContainer} />
                    <PrivateRoute exact path="/" component={ChatContainer} />
                </Switch>
            </ConnectedRouter>
        </SnackbarProvider>
    </Provider>
);


export default routes;
