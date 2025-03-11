import {
  GET_TWEET_BY_ID_REQUEST,
  GET_TWEET_BY_ID_FAILURE,
  GET_TWEET_BY_ID_SUCCESS,
} from "../Types";

const initialData = {
  data: [],
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

    default:
      return state;
  }
};
