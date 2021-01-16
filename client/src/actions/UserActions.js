import { SET_PLAYER_COORDS } from './types';

export const setPlayerCoords = (name, lat, long) => async dispatch => {
  console.log('setting Player Coords');
  console.log(lat);
  console.log(long);
  // Make POST request
  dispatch({
    type: SET_PLAYER_COORDS,
    payload: {
      lat: lat,
      long: long
    }
  });
}