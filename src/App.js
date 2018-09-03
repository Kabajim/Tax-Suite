import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore';
import { addLinkContainer } from './actions/dashboard'

const store = configureStore();

store.dispatch(addLinkContainer({name: "TestContainer1"}));
store.dispatch(addLinkContainer({name: "TestContainer2"}));

const jsx = (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );

ReactDOM.render(jsx, document.getElementById('root'));
