import { SET_CLOSEST_SPELL_TOME, LEARN_ICE, LEARN_FIREBALL, LEARN_HEAL } from "./types";

export const getClosestSpellTome = (name) => async dispatch => {
  console.log('getClosest')
  console.log(name);
  const response = await fetch('https://battle-locale.herokuapp.com/api/game/getClosestSpellTome', {
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
  console.log(data);
  if (!data) throw new Error('Empty response from server');
  if (data.error) throw new Error(data.error.message);

  // if distance, set closest spell
  if (data.distance < 8000) {
    dispatch({
      type: SET_CLOSEST_SPELL_TOME,
      payload: data.spellTome
    });
  } else {
    dispatch({
      type: SET_CLOSEST_SPELL_TOME,
      payload: ''
    });
  }
}

export const getClosestUser = (name) => async dispatch => {
  console.log('getClosest')
  console.log(name);
  const response = await fetch('https://battle-locale.herokuapp.com/api/game/getClosestOtherPlayer', {
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
  console.log(data);
  if (!data) throw new Error('Empty response from server');
  if (data.error) throw new Error(data.error.message);
}

export const learnSpell = (spell) => async dispatch => {
  console.log('earning');
  /*const response = await fetch('https://battle-locale.herokuapp.com/api/game/learnSpell', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      spelltome: spellTome
    }),
  });

  const data = await response.json();
  console.log(data);
  if (!data) throw new Error('Empty response from server');
  if (data.error) throw new Error(data.error.message);
  */
  if(spell == 'Heal') {
    console.log('heal learned');
    dispatch({
      type: LEARN_HEAL,
      payload: ''
    });
  } else if(spell == 'Ice Bolt') {
    console.log('ice bolt learned');
    dispatch({
      type: LEARN_ICE,
      payload: ''
    });
  } else if(spell == 'Fireball') {
    console.log('fireball learned');
    dispatch({
      type: LEARN_FIREBALL,
      payload: ''
    });
  }
}