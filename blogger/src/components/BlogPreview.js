import React from 'react';
import { Link } from 'react-router-dom';
import agent from '../agent';
import { connect } from 'react-redux';
import { BLOG_FAVORITED, BLOG_UNFAVORITED } from '../constants/actionTypes';

const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

const mapDispatchToProps = dispatch => ({
  favorite: slug => dispatch({
    type: BLOG_FAVORITED,
    payload: agent.Blogs.favorite(slug)
  }),
  unfavorite: slug => dispatch({
    type: BLOG_UNFAVORITED,
    payload: agent.Blogs.unfavorite(slug)
  })
});

const BlogPreview = props => {
  const blog = props.blog;
  const favoriteButtonClass = blog.favorited ?
    FAVORITED_CLASS :
    NOT_FAVORITED_CLASS;

  const handleClick = ev => {
    ev.preventDefault();
    if (blog.favorited) {
      props.unfavorite(blog.slug);
    } else {
      props.favorite(blog.slug);
    }
  };

  return (
    <div className="blog-preview">
      <div className="blog-meta">
        <Link to={`/@${blog.author.username}`}>
          <img src={blog.author.image} alt={blog.author.username} />
        </Link>

        <div className="info">
          <Link className="author" to={`/@${blog.author.username}`}>
            {blog.author.username}
          </Link>
          <span className="date">
            {new Date(blog.createdAt).toDateString()}
          </span>
        </div>

        <div className="pull-xs-right">
          <button className={favoriteButtonClass} onClick={handleClick}>
            <i className="ion-heart"></i> {blog.favoritesCount}
          </button>
        </div>
      </div>

      <Link to={`/blog/${blog.slug}`} className="preview-link">
        <h1>{blog.title}</h1>
        <p>{blog.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {
            blog.tagList.map(tag => {
              return (
                <li className="tag-default tag-pill tag-outline" key={tag}>
                  {tag}
                </li>
              )
            })
          }
        </ul>
      </Link>
    </div>
  );
}

export default connect(() => ({}), mapDispatchToProps)(BlogPreview);
