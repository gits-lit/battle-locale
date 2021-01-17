import { LOGIN_USER, SET_PLAYER_COORDS, SET_PLAYER_HEALTH, LEARN_FIREBALL, LEARN_HEAL, LEARN_ICE } from '../actions/types';

const initialState = {
  name: '',
  lat: '',
  long: '',
  health: 100,
  arcane: true,
  fireball: false,
  heal: false,
  icebolt: false
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
    case SET_PLAYER_HEALTH:
        return {
          ...state,
          health: action.payload
        }
    case LEARN_FIREBALL:
      return {
        ...state,
        fireball: true
      }
    case LEARN_HEAL:
      return {
        ...state,
        heal: true
        }
    case LEARN_ICE:
      return {
        ...state,
        icebolt: true
        }
    default:
      return state;
  }
};

export default UserReducer;