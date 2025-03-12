import {
  GET_TWEET_BY_ID_REQUEST,
  GET_TWEET_BY_ID_FAILURE,
  GET_TWEET_BY_ID_SUCCESS,
  GET_ALL_TWEET_REQUEST,
  GET_ALL_TWEET_SUCCESS,
  GET_ALL_TWEET_FAILURE,
  CREATE_TWEET_REQUEST,
  CREATE_TWEET_SUCCESS,
  CREATE_TWEET_FAILURE,
} from "../Types";

const initialData = {
  data: [],
  AllTWeetData: null,
  loading: false,
  error: null,
};

export const AllTweetReducers = (state = initialData, action) => {
  switch (action.type) {
    case GET_TWEET_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_TWEET_BY_ID_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case GET_TWEET_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case GET_ALL_TWEET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ALL_TWEET_SUCCESS:
      return {
        ...state,
        AllTWeetData: action.payload,
        loading: false,
        error: null,
      };
    case GET_ALL_TWEET_FAILURE:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case CREATE_TWEET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_TWEET_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case CREATE_TWEET_FAILURE:
      return {
        ...state,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};
