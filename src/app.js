import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore';
import { startSetDashboardState, startClearDashboardState } from './actions/dashboard'
import { login, logout } from './actions/auth'
import LoadingPage from './components/basics/LoadingPage'
import { firebase } from './firebase/firebase'

const store = configureStore();

const jsx = (
    <Provider store={store}>
      <AppRouter />
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('root'));
    hasRendered = true;
  }
}

ReactDOM.render(<LoadingPage />, document.getElementById('root'));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user))
    store.dispatch(startSetDashboardState()).then(() => {
      renderApp();
    })
  } else {
    store.dispatch(startClearDashboardState())
    store.dispatch(logout())
    renderApp();
  }
})