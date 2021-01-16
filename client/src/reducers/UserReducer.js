import { LOGIN_USER, SET_PLAYER_COORDS } from '../actions/types';

const initialState = {
  name: '',
  lat: '',
  long: '',
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        name: action.payload.name,
      };
    case SET_PLAYER_COORDS:
      return {
        ...state,
        lat: action.payload.lat,
        long: action.payload.long
      }
    default:
      return state;
  }
};

export default UserReducer;