import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import UserReducer from './UserReducer';
import AllUserReducer from './AllUserReducer';
import SpellsReducer from './SpellsReducer';

export default history =>
  combineReducers({
    router: connectRouter(history),
    user: UserReducer,
    alluser: AllUserReducer,
    spells: SpellsReducer
  });