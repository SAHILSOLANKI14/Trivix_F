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
  GET_AGENCY_BY_ID_REQUEST,
  GET_AGENCY_BY_ID_FAILURE,
  GET_AGENCY_BY_ID_SUCCESS,
  GET_TRAVELER_BY_ID_FAILURE,
  GET_TRAVELER_BY_ID_REQUEST,
  GET_TRAVELER_BY_ID_SUCCESS,
} from "../Types";

const initialData = {
  data: [],
  AllTWeetData: null,
  hasMore: true,
  loading: false,
  error: null,
};
const profileData = {
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
export const ProfileReducer = (state = profileData, action) => {
  switch (action.type) {
    case GET_AGENCY_BY_ID_REQUEST:
    case GET_TRAVELER_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_AGENCY_BY_ID_SUCCESS:
    case GET_TRAVELER_BY_ID_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case GET_AGENCY_BY_ID_FAILURE:
    case GET_TRAVELER_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};
