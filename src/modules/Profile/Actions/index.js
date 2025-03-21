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

export const getAllTweetsRequest = (page, limit, sort) => ({
  type: GET_ALL_TWEET_REQUEST,
  payload: { page, limit, sort },
});
export const getAllTweetsSuccess = (data) => ({
  type: GET_ALL_TWEET_SUCCESS,
  payload: data,
});
export const getAllTweetsFailure = (error) => ({
  type: GET_ALL_TWEET_FAILURE,
  payload: error,
});

export const CreatTweetsRequest = (data) => ({
  type: CREATE_TWEET_REQUEST,
  payload: { data },
});
export const CreatTweetsSuccess = (payload) => ({
  type: CREATE_TWEET_SUCCESS,
  payload: payload,
});
export const CreatTweetsFailure = (payload) => ({
  type: CREATE_TWEET_FAILURE,
  payload: payload,
});

export const agencyByIdRequest = (id) => ({
  type: GET_AGENCY_BY_ID_REQUEST,
  payload: { id },
});
export const agencyByIdSuccess = (payload) => ({
  type: GET_AGENCY_BY_ID_SUCCESS,
  payload: payload,
});
export const agencyByIdFailure = (error) => ({
  type: GET_AGENCY_BY_ID_FAILURE,
  payload: error,
});

export const travelerByIdRequest = (id) => ({
  type: GET_TRAVELER_BY_ID_REQUEST,
  payload: { id },
});
export const travelerByIdSuccess = (payload) => ({
  type: GET_TRAVELER_BY_ID_SUCCESS,
  payload: payload,
});
export const travelerByIdFailure = (error) => ({
  type: GET_TRAVELER_BY_ID_FAILURE,
  payload: error,
});
