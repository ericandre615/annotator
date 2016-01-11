import { ADD_CATEGORY } from '../actions/action-types';

let initialState = [];

export const categoriesReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_CATEGORY:
      if(state.indexOf(action.category) < 0) {
        return [...state, action.category];
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default {
  categoriesReducer
};
