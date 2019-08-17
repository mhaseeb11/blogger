import BlogActions from './BlogActions';
import { Link } from 'react-router-dom';
import React from 'react';

const BlogMeta = props => {
  const blog = props.blog;
  return (
    <div className="blog-meta">
      <Link to={`/@${blog.author.username}`}>
        <img src={blog.author.image} alt={blog.author.username} />
      </Link>

      <div className="info">
        <Link to={`/@${blog.author.username}`} className="author">
          {blog.author.username}
        </Link>
        <span className="date">
          {new Date(blog.createdAt).toDateString()}
        </span>
      </div>

      <BlogActions canModify={props.canModify} blog={blog} />
    </div>
  );
};

export default BlogMeta;
