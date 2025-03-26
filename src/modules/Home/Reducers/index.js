import {
  GET_ALL_POSTS_REQUEST,
  GET_ALL_POSTS_SUCCESS,
  GET_ALL_POSTS_FAILURE,
  GET_COMMENTS_BY_ID_REQUEST,
  GET_COMMENTS_BY_ID_SUCCESS,
  GET_COMMENTS_BY_ID_FAILURE,
  POST_COMMENTS_BY_ID_SUCCESS,
} from "../Types";

const initialData = {
  data: [],
  comments: [],
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
    case GET_COMMENTS_BY_ID_REQUEST:
      return {
        ...state,
        error: null,
      };
    case GET_COMMENTS_BY_ID_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        error: null,
      };
    case GET_COMMENTS_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case POST_COMMENTS_BY_ID_SUCCESS:
      return {
        ...state,
        comments: Array.isArray(state.comments)
          ? [...state.comments, action.payload]
          : [action.payload],
      };

    default:
      return state;
  }
};
