import { LOGIN_USER } from '../actions/types';

const initialState = {
  name: '',
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        name: action.payload.name,
      };
    default:
      return state;
  }
};

export default UserReducer;