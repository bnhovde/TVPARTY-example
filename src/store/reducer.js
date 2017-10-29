import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import rooms from './rooms/';
import users from './users/';

export default combineReducers({
  routing: routerReducer,
  rooms,
  users,
});
