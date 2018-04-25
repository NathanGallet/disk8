import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
import { ChatContainer } from './containers';

const store = configureStore();

// Provider wraps our root component
const routes = (
  <Provider store={store}>
    <div className="wrapper">
        <ChatContainer />
    </div>
  </Provider>
);

export default routes;
