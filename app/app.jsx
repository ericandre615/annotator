import React from 'react';
import { connect } from 'react-redux';
import Header from './components/header/header.jsx';
import Document from './components/documents/document.jsx';
import Annotations from './components/annotations/annotations.jsx';
import { getAnnotations } from './api/annotations';
import { getDocument } from './api/documents';
import { addDocument, toggleHighlights } from './actions/documents-actions';
import { addAnnotations, editAnnotations, addAnnotation } from './actions/annotations-actions';
import { addCategory } from './actions/categories-actions';

import './app.less';

const App = React.createClass({
  componentDidMount() {
    let doc_id;

    getAnnotations()
      .then((response) => { 
        doc_id = response.data.document.attr.DOCID;
        
        let annotations = response.data.document.span.map((annotation, i) => {
          annotation.id = `${response.data.document.attr.DOCID}-${annotation.extent.charseq.attr.START}`;
          this.props.addCategory(annotation.attr.category);
          return annotation;
        });

        this.props.addAnnotations(annotations); 

        return getDocument(doc_id);
      })
      .then((doc) => { 
        return this.props.addDocument(doc_id, doc.data);
      })
      .then(null, function(error) {
        throw new Error(error);
      });
  },

  handleSaveState(e) {
    let savedAnnotations = {
      document: {
        attr: {
          DOCID: this.props.documents.id
        },
        span: this.props.annotations.map((annotation, i) => {
          return {
            attr: annotation.attr,
            extent: annotation.extent
          }
        })
      }
    };

    console.log('SAVED ', savedAnnotations);
  },

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="menu-bar">
            <button 
              className="toggle-highlights btn btn-secondary btn-sm"
              onClick={ this.props.toggleHighlights }
            >
              highlights
            </button>
            
            <span className={`btn btn-sm toggle-status ${(this.props.documents.highlights) ? 'active' : ''}`}>{ (this.props.documents.highlights) ? 'on' : 'off'  }</span>
            
            <button
              className="save-state btn btn-success pull-right"
              onClick={ this.handleSaveState }
            >
              Save Annotations
            </button>
          </div>

          <Document
            document={ this.props.documents.text }
            doc_id={ this.props.documents.id }
            annotations={ this.props.annotations }
            highlights={ this.props.documents.highlights  }
            addAnnotation={ this.props.addAnnotation  }
          />
          <Annotations annotations={ this.props.annotations }/>
        </div>
      </div>
    );
  }
});

const mapStateToProps = (state) => {
  return {
    documents: state.documents,
    categories: state.categories,
    annotations: state.annotations
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addDocument: (doc_id, text, annotations) => dispatch(addDocument(doc_id, text, annotations)),
    addAnnotations: (annotations) => dispatch(addAnnotations(annotations)),
    editAnnotation: (id, category) => dispatch(editAnnotation(id, category)),
    addCategory: (category) => dispatch(addCategory(category)),
    addAnnotation: (annotation) => dispatch(addAnnotation(annotation)),
    toggleHighlights: () => dispatch(toggleHighlights())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
