'use strict';

export const highlightAnnotations = (doc = '', annotations = [], offset = 0) => {
  let highlighted = '';
  let tempAnnotations = [].concat(annotations);
  for(let cursor = 0; cursor < doc.length; cursor++) {
    if(cursor > 0) {
      highlighted += doc[cursor];
    }
    tempAnnotations.some((annotation, i) => {
      let start = annotation.extent.charseq.attr.START;
      let end = annotation.extent.charseq.attr.END;
      let category = annotation.attr.category;
      start = (start != 0) ? start - offset : start;

      if(cursor == start) {
        highlighted += `<mark data-id="${annotation.id}" class="${category.toLowerCase()}">`;
      }
      if(cursor == end) {
        highlighted += '</mark>';
        /* remove the annotation from the array after it's not needed.
        ** This help with performance for subsequent runs through the loop
        */
        tempAnnotations.splice(i, 1);
      }
    });
    if(cursor == 0) {
      highlighted += doc[cursor];
    }
  }

  return highlighted;
};

export default {
  highlightAnnotations
};
