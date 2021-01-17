import { GET_ALL_USERS, LOGIN_USER, SET_PLAYER_COORDS } from './types';
import { replace } from 'connected-react-router';

export const setPlayerCoords = (name, lat, long) => async dispatch => {
  console.log('setting Player Coords');
  console.log(lat);
  console.log(long);
  const response = await fetch('https://battle-locale.herokuapp.com/api/game/setPlayerCoords', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      lat: lat.toString(),
      long: long.toString()
    }),
  });

  const data = await response.json();
  console.log(data);
  if (!data) throw new Error('Empty response from server');
  if (data.error) throw new Error(data.error.message);
  dispatch({
    type: SET_PLAYER_COORDS,
    payload: {
      lat: lat,
      long: long
    }
  });
}

export const loginUser = (name) => async dispatch => {
  console.log('logging in' + name);
  const response = await fetch('https://battle-locale.herokuapp.com/api/users/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name
    }),
  });

    const data = await response.json();
    if (!data) throw new Error('Empty response from server');
    if (data.error) throw new Error(data.error.message);

  dispatch({
    type: LOGIN_USER,
    payload: {
      name: name
    }
  });
  dispatch(replace('/queue'));
}

export const getAllUsers = () => async dispatch => {
  console.log('getAll')
  const response = await fetch('https://battle-locale.herokuapp.com/api/users', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  });

    const data = await response.json();
    console.log(data);
    if (!data) throw new Error('Empty response from server');
    if (data.error) throw new Error(data.error.message);

    dispatch({
      type: GET_ALL_USERS,
      payload: data.users
    });
}

export const redirectHome = () => async dispatch => {
  dispatch(replace('/'));
}