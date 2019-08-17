import BlogMeta from './BlogMeta';
import CommentContainer from './CommentContainer';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import marked from 'marked';
import { BLOG_PAGE_LOADED, BLOG_PAGE_UNLOADED } from '../../constants/actionTypes';

const mapStateToProps = state => ({
  ...state.blog,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: BLOG_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: BLOG_PAGE_UNLOADED })
});

class Blog extends React.Component {
  componentWillMount() {
    this.props.onLoad(Promise.all([
      agent.Blogs.get(this.props.match.params.id),
      agent.Comments.forBlog(this.props.match.params.id)
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if (!this.props.blog) {
      return null;
    }

    const markup = { __html: marked(this.props.blog.body, { sanitize: true }) };
    const canModify = this.props.currentUser &&
      this.props.currentUser.username === this.props.blog.author.username;
    return (
      <div className="blog-page">

        <div className="banner">
          <div className="container">

            <h1>{this.props.blog.title}</h1>
            <BlogMeta
              blog={this.props.blog}
              canModify={canModify} />

          </div>
        </div>

        <div className="container page">

          <div className="row blog-content">
            <div className="col-xs-12">

              <div dangerouslySetInnerHTML={markup}></div>

              <ul className="tag-list">
                {
                  this.props.blog.tagList.map(tag => {
                    return (
                      <li
                        className="tag-default tag-pill tag-outline"
                        key={tag}>
                        {tag}
                      </li>
                    );
                  })
                }
              </ul>

            </div>
          </div>

          <hr />

          <div className="blog-actions">
          </div>

          <div className="row">
            <CommentContainer
              comments={this.props.comments || []}
              errors={this.props.commentErrors}
              slug={this.props.match.params.id}
              currentUser={this.props.currentUser} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
