import {
  GET_ALL_POSTS_REQUEST,
  GET_ALL_POSTS_SUCCESS,
  GET_ALL_POSTS_FAILURE,
} from "../Types";

const initialData = {
  data: [],
  loading: false,
  error: null,
};
export const AllPostsReducer = (state = initialData, action) => {
  switch (action.type) {
    case GET_ALL_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ALL_POSTS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case GET_ALL_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
