'use strict';

export function getCharseq(selected = '', text = '', doc_id) {
  let annotation = {};
  let START = text.indexOf(selected);
  let END = parseInt(START + selected.length - 1, 10);

  annotation = {
    id: `${doc_id}-${START}`,
    attr: {
      category: 'PERSON'
    },
    extent: {
      charseq: {
        attr: {
          END,
          START
        },
        text: selected
      }
    }
  }

  console.log('annotation ', annotation);
  return annotation;
};

export default {
  getCharseq
}
