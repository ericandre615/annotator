import axios from 'axios';

export const getAnnotations = () => {
  return axios.get('/annotations');
};

export default {
  getAnnotations
};
