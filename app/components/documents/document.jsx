import React from 'react';
import { highlightAnnotations } from '../../utils/highlighter';
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

  closeModal(e){
    e.preventDefault();
    this.setState({
      showModal: false,
      showAnnotation: false
    });
  },

  handleMarkerClick(e) {
    e.preventDefault();
    if(e.target.nodeName === 'MARK') {
      let annotation = this.props.annotations.filter((annotation) => {
        if(e.target.dataset.id === annotation.id) {
          return annotation;
        }
      });

      if(annotation) {
        this.setState({
          showModal: true,
          showAnnotation: {
            annotation: annotation[0],
            left: e.target.offsetLeft,
            top: e.target.offsetTop
          }
        });
      }
    }
  },

  render() {
    var annotated = highlightAnnotations(this.props.document, this.props.annotations, 1);

    return (
      <div>
      { (this.state.showModal) ? <div className="annotation-modal" style={{top: this.state.showAnnotation.top, left: this.state.showAnnotation.left}}><button className="annotation-modal-close" onClick={this.closeModal}>x</button><Annotation annotation={ this.state.showAnnotation.annotation } /></div> : false }
      <pre className={`document col-xs-12 col-md-8 ${(this.props.highlights) ? 'highlights' : ''}`}
        dangerouslySetInnerHTML = {
          {
            __html: annotated
          }
        }
        onClick={ this.handleMarkerClick }
      >
      </pre>
      </div>
    );
  }
});

export default Document;
