import React from 'react';
import { connect } from 'react-redux';
import { removeAnnotation, editAnnotation } from '../../actions/annotations-actions';

const Annotation = React.createClass({
  propType: {
    annotation: React.PropTypes.object.isRequired
  },

  handleRemove(e) {
    let annotation_id = e.target.dataset.id;
    this.props.removeAnnotation(annotation_id);
  },

  handleOnChange(e) {
    this.props.editAnnotation(this.props.annotation.id, e.target.value);
  },

  render() {
      let categories = this.props.categories.map((category, i) => {
      return (
        <option value={ category } key={ `category-${category}`  }>
          { category  }
        </option>
      );
    });

    return (
      <div className="annotation" key={ this.props.annotation.id  }>
        <span className="annotation">{ this.props.annotation.extent.charseq.text } </span>
        <select className="category form-control"
          defaultValue={ this.props.annotation.attr.category }
          onChange={ this.handleOnChange }
        >
          { categories }
        </select>
        <button className="btn btn-danger" onClick={ this.handleRemove } data-id={ this.props.annotation.id } >remove</button>
      </div>
    );
  }
});

const mapStateToProps = (state) => {
  return {
    annotations: state.annotations,
    categories: state.categories
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeAnnotation: (id) => dispatch(removeAnnotation(id)),
    editAnnotation: (id, category) => dispatch(editAnnotation(id, category))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Annotation);
