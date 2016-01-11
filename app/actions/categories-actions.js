import { ADD_CATEGORY } from './action-types';

export const addCategory  = (category = '') => {
  return {
    type: ADD_CATEGORY,
    category
  };
};

export default {
  addCategory
}
