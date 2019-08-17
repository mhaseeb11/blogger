import {
  BLOG_FAVORITED,
  BLOG_UNFAVORITED,
  SET_PAGE,
  APPLY_TAG_FILTER,
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  CHANGE_TAB,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
  PROFILE_FAVORITES_PAGE_LOADED,
  PROFILE_FAVORITES_PAGE_UNLOADED
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case BLOG_FAVORITED:
    case BLOG_UNFAVORITED:
      return {
        ...state,
        blogs: state.blogs.map(blog => {
          if (blog.slug === action.payload.blog.slug) {
            return {
              ...blog,
              favorited: action.payload.blog.favorited,
              favoritesCount: action.payload.blog.favoritesCount
            };
          }
          return blog;
        })
      };
    case SET_PAGE:
      return {
        ...state,
        blogs: action.payload.blogs,
        blogsCount: action.payload.blogsCount,
        currentPage: action.page
      };
    case APPLY_TAG_FILTER:
      return {
        ...state,
        pager: action.pager,
        blogs: action.payload.blogs,
        blogsCount: action.payload.blogsCount,
        tab: null,
        tag: action.tag,
        currentPage: 0
      };
    case HOME_PAGE_LOADED:
      const tags = action.payload[0] ? action.payload[0].tags : '';
      const blogs = action.payload[1] ? action.payload[1].blogs : '';
      const blogsCount = action.payload[1] ? action.payload[1].blogsCount : '';
      return {
        ...state,
        pager: action.pager,
        tags,
        blogs,
        blogsCount,
        currentPage: 0,
        tab: action.tab
      };
    case HOME_PAGE_UNLOADED:
      return {};
    case CHANGE_TAB:
      return {
        ...state,
        pager: action.pager,
        blogs: action.payload.blogs,
        blogsCount: action.payload.blogsCount,
        tab: action.tab,
        currentPage: 0,
        tag: null
      };
    case PROFILE_PAGE_LOADED:
    case PROFILE_FAVORITES_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager,
        blogs: action.payload[1].blogs,
        blogsCount: action.payload[1].blogsCount,
        currentPage: 0
      };
    case PROFILE_PAGE_UNLOADED:
    case PROFILE_FAVORITES_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
