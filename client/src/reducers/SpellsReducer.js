import { SET_CLOSEST_SPELL_TOME } from '../actions/types';

const initialState = {
  closest_spell_tome: '',
};

const SpellsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CLOSEST_SPELL_TOME:
      return {
        ...state,
        closest_spell_tome: action.payload
      };
    default:
      return state;
  }
};

export default SpellsReducer;