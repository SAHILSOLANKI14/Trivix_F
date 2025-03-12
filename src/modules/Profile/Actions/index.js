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

export const getTweetsRequest = (Datas) => ({
  type: GET_TWEET_BY_ID_REQUEST,
  payload: { Datas },
});
export const getTweetsSuccess = (payload) => ({
  type: GET_TWEET_BY_ID_SUCCESS,
  payload: payload,
});
export const getTweetsFailure = (payload) => ({
  type: GET_TWEET_BY_ID_FAILURE,
  payload: payload,
});

export const getAllTweetsRequest = (payload) => ({
  type: GET_ALL_TWEET_REQUEST,
  payload: payload,
});
export const getAllTweetsSuccess = (payload) => ({
  type: GET_ALL_TWEET_SUCCESS,
  payload: payload,
});
export const getAllTweetsFailure = (payload) => ({
  type: GET_ALL_TWEET_FAILURE,
  payload: payload,
});

export const CreatTweetsRequest = (data) => ({
  type: CREATE_TWEET_REQUEST,
  payload: {data},
});
export const CreatTweetsSuccess = (payload) => ({
  type: CREATE_TWEET_SUCCESS,
  payload: payload,
});
export const CreatTweetsFailure = (payload) => ({
  type: CREATE_TWEET_FAILURE,
  payload: payload,
});
