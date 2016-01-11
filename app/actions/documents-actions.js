import { ADD_DOCUMENT, TOGGLE_HIGHLIGHTS } from './action-types';

export const addDocument = (doc_id, text = '') => {
  return {
    type: ADD_DOCUMENT,
    doc_id,
    text
  };
}

export const toggleHighlights = ()=> {
  return {
    type: TOGGLE_HIGHLIGHTS
  };
};

export default {
  addDocument,
  toggleHighlights
};
