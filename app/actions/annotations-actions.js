import { ADD_ANNOTATION, ADD_ANNOTATIONS, EDIT_ANNOTATION, REMOVE_ANNOTATION } from './action-types';

export const addAnnotations = (annotations = []) => {
  return {
    type: ADD_ANNOTATIONS,
    annotations
  };
};

export const addAnnotation = (annotation = {}) => {
  return {
    type: ADD_ANNOTATION,
    annotation
  };
};

export const editAnnotation = (id, category) => {
  return {
    type: EDIT_ANNOTATION,
    id,
    category
  };
};

export const removeAnnotation = (id) => {
  return {
    type: REMOVE_ANNOTATION,
    id
  };
};

export default {
  addAnnotations,
  addAnnotation,
  editAnnotation,
  removeAnnotation
};
