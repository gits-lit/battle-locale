import { GET_ALL_USERS } from '../actions/types';

const initialState = {
  count: 0,
};

const AllUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        count: action.payload.length,
      };
    default:
      return state;
  }
};

export default AllUserReducer;