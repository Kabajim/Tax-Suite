import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore';
import { startSetDashboardState } from './actions/dashboard'
import './firebase/firebase'

const store = configureStore();

const jsx = (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );

ReactDOM.render(<p>Loading...</p>, document.getElementById('root'));

store.dispatch(startSetDashboardState()).then(() => {
  ReactDOM.render(jsx, document.getElementById('root'));
})

