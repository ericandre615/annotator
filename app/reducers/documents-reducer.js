import { ADD_DOCUMENT, TOGGLE_HIGHLIGHTS } from '../actions/action-types';

let initialState = {
  id: null,
  text: '',
  highlights: true
}

export const documentsReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_DOCUMENT:
      return Object.assign({}, state, {
        id: action.doc_id,
        text: action.text
      });
    case TOGGLE_HIGHLIGHTS:
      return Object.assign({}, state, {
        highlights: !state.highlights
      });
    default:
      return state;
  }
};

export default {
  documentsReducer
};
