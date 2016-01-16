import { ADD_ANNOTATIONS, REMOVE_ANNOTATION, EDIT_ANNOTATION } from '../actions/action-types';

let intialState = [
  {
    id: null,
    attr: {
      category: '' 
    },
    extent: {
      charseq: {
        attr: {
          END: null,
          START: null
        },
        text: ''
      }
    }
  }
];

export const annotationsReducer = (state = intialState, action) => {
  switch(action.type) {
    case ADD_ANNOTATIONS:
      let newAnnotations = [];
      newAnnotations.concat(...state);
      action.annotations.forEach((annotation, i) => {
        newAnnotations.push(annotation);
      });
      return newAnnotations;
    case REMOVE_ANNOTATION:
      return state.filter((annotation, i) => {
        if(annotation.id !== action.id) {
          return annotation;
        }
      });
    case EDIT_ANNOTATION:
      return state.map((annotation, i) => {
        if(annotation.id !== action.id) {
          return annotation;
        }

        return Object.assign({}, annotation, {
          attr: {
            category: action.category
          }
        }); 
      });
    default:
      return state;
  }
};

export default {
  annotationsReducer
};
