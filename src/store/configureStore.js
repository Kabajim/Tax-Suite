import { createStore, combineReducers } from 'redux';
import sidebarReducer from '../reducers/sidebarReducer';
import dashboardReducer from '../reducers/dashboardReducer';

export default () => {
  const store = createStore(
    combineReducers({
        sidebar: sidebarReducer,
        dashboard: dashboardReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};
