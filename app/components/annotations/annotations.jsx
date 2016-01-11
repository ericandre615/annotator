import React from 'react';
import { connect } from 'react-redux';
import Annotation from './annotation.jsx';
import { removeAnnotation, editAnnotation } from '../../actions/annotations-actions';
import './annotations.less';

const Annotations = React.createClass({
  propTypes: {
    annotations: React.PropTypes.array.isRequired
  },
 
  render() {
    let annotations = this.props.annotations.map((annotation, index) => {
      return (
        <li key={`annotation-${index}`}>
          <Annotation key={ annotation.id } 
            annotation={ annotation }
          />
        </li>
      );
    });
    return (
      <ul className="annotations col-xs-12 col-md-4">
        {annotations}
      </ul>
    );
  }
});

const mapStateToProps = (state) => {
  return {
    annotations: state.annotations,
    categories: state.categories
  };
};

export default connect(mapStateToProps)(Annotations);
