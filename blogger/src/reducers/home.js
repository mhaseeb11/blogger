import { HOME_PAGE_LOADED, HOME_PAGE_UNLOADED } from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case HOME_PAGE_LOADED:
        const tags = action.payload[0] ? action.payload[0].tags : '';
      return {
        ...state,
        tags
      };
    case HOME_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
