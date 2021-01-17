import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import UserReducer from './UserReducer';
import AllUserReducer from './AllUserReducer';

export default history =>
  combineReducers({
    router: connectRouter(history),
    user: UserReducer,
    alluser: AllUserReducer
  });