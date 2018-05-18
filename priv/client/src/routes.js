import React from 'react';
import { Provider } from 'react-redux';
import { configureStore, history } from './store';
import { ChatContainer } from './containers';

import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';

const store = configureStore();

// Provider wraps our root component
const routes = (
  <Provider store={store}>
      <ConnectedRouter history={history}>
          <Switch>
              <Route path="/" component={ChatContainer} />
          </Switch>
      </ConnectedRouter>
  </Provider>
);

export default routes;
