import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import games from './games/';
import users from './users/';

export default combineReducers({
  routing: routerReducer,
  games,
  users,
});
