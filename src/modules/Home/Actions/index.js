import {
  GET_ALL_POSTS_REQUEST,
  GET_ALL_POSTS_SUCCESS,
  GET_ALL_POSTS_FAILURE,
} from "../Types";

export const allPostsRequest = (payload) => ({
  type: GET_ALL_POSTS_REQUEST,
  payload: payload,
});
export const allPostsSuccess = (payload) => ({
  type: GET_ALL_POSTS_SUCCESS,
  payload: payload,
});
export const allPostsFailure = (payload) => ({
  type: GET_ALL_POSTS_FAILURE,
  payload: payload,
});
