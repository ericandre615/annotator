import axios from 'axios';

export const getDocument = (doc_id = null) => {
  return axios.get(`/documents/${doc_id}`);
};

export default {
  getDocument
};
