import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import UserReducer from './UserReducer';

export default history =>
  combineReducers({
    router: connectRouter(history),
    user: UserReducer,
  });