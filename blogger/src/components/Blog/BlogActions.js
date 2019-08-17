import { Link } from 'react-router-dom';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { DELETE_BLOG } from '../../constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  onClickDelete: payload =>
    dispatch({ type: DELETE_BLOG, payload })
});

const BlogActions = props => {
  const blog = props.blog;
  const del = () => {
    props.onClickDelete(agent.Blogs.del(blog.slug))
  };
  if (props.canModify) {
    return (
      <span>

        <Link
          to={`/editor/${blog.slug}`}
          className="btn btn-outline-secondary btn-sm">
          <i className="ion-edit"></i> Edit Blog
        </Link>

        <button className="btn btn-outline-danger btn-sm" onClick={del}>
          <i className="ion-trash-a"></i> Delete Blog
        </button>

      </span>
    );
  }

  return (
    <span>
    </span>
  );
};

export default connect(() => ({}), mapDispatchToProps)(BlogActions);
