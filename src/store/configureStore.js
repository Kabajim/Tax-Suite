import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import sidebarReducer from '../reducers/sidebarReducer';
import dashboardReducer from '../reducers/dashboardReducer';
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
        sidebar: sidebarReducer,
        dashboard: dashboardReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
