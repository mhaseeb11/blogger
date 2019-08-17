import BlogPreview from './BlogPreview';
import ListPagination from './ListPagination';
import React from 'react';

const BlogList = props => {
  if (!props.blogs) {
    return (
      <div className="blog-preview">Loading...</div>
    );
  }

  if (props.blogs.length === 0) {
    return (
      <div className="blog-preview">
        No blogs are here... yet.
      </div>
    );
  }

  return (
    <div>
      {
        props.blogs.map(blog => {
          return (
            <BlogPreview blog={blog} key={blog.slug} />
          );
        })
      }

      <ListPagination
        pager={props.pager}
        blogsCount={props.blogsCount}
        currentPage={props.currentPage} />
    </div>
  );
};

export default BlogList;
