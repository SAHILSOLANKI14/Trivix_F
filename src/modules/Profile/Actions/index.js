import {
  GET_TWEET_BY_ID_REQUEST,
  GET_TWEET_BY_ID_FAILURE,
  GET_TWEET_BY_ID_SUCCESS,
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
