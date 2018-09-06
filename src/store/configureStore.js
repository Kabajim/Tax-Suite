import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import sidebarReducer from '../reducers/sidebarReducer';
import dashboardReducer from '../reducers/dashboardReducer';
import authReducer from '../reducers/authReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      sidebar: sidebarReducer,
      dashboard: dashboardReducer,
      user: authReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
