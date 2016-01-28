import React from 'react';
import { highlightAnnotations } from '../../utils/highlighter';
import { getCharseq } from '../../utils/get-charseq';
import Annotation from '../annotations/annotation.jsx';

import './document.less';

const Document = React.createClass({
  propTypes: {
    document: React.PropTypes.string.isRequired,
    annotations: React.PropTypes.array
  },

  getInitialState() {
    return {
      showModal: false,
      showAnnotation: false
    }
  },

  handleSelection(e) {
    if(e.target.nodeName !== 'MARK') {
      let selectedText = window.getSelection().toString();
      let parentText = document.querySelector('.document').innerText;

      if(selectedText.length > 0) {
        let newAnnotation = getCharseq(selectedText, parentText, this.props.doc_id);

        return this.props.addAnnotation(newAnnotation);
      }
    }
  },

  closeModal(e){
    e.preventDefault();
    this.setState({
      showModal: false,
      showAnnotation: false
    });
  },

  handleMarkerClick(e) {
    e.preventDefault();
    var doc = document.querySelector('.document');
    if(e.target.nodeName === 'MARK') {
      let annotation = this.props.annotations.filter((annotation) => {
        if(e.target.dataset.id === annotation.id) {
          return annotation;
        }
      });
      if(annotation) {
        let top = e.target.offsetTop;
        this.setState({
          showModal: true,
          showAnnotation: {
            annotation: annotation[0],
            top
          }
        });
      }
    }
  },

  render() {
    var annotated = highlightAnnotations(this.props.document, this.props.annotations, 1);

    return (
      <div>
      { (this.state.showModal) ? <div className="annotation-modal col-xs-8 col-sm-6 col-md-4 col-lg-4" style={{top: this.state.showAnnotation.top, left: this.state.showAnnotation.left}}><button className="annotation-modal-close" onClick={this.closeModal}>x</button><Annotation annotation={ this.state.showAnnotation.annotation } /></div> : false }
      <pre className={`document col-xs-12 col-md-8 ${(this.props.highlights) ? 'highlights' : ''}`}
        dangerouslySetInnerHTML = {
          {
            __html: annotated
          }
        }
        onClick={ this.handleMarkerClick }
        onMouseUp={ this.handleSelection }
      >
      </pre>
      </div>
    );
  }
});

export default Document;
