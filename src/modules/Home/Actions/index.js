import {
  GET_ALL_POSTS_REQUEST,
  GET_ALL_POSTS_SUCCESS,
  GET_ALL_POSTS_FAILURE,
  GET_COMMENTS_BY_ID_REQUEST,
  GET_COMMENTS_BY_ID_FAILURE,
  GET_COMMENTS_BY_ID_SUCCESS,
  POST_COMMENTS_BY_ID_FAILURE,
  POST_COMMENTS_BY_ID_REQUEST,
  POST_COMMENTS_BY_ID_SUCCESS,
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

export const CommentsByIdRequest = (id) => ({
  type: GET_COMMENTS_BY_ID_REQUEST,
  payload: { id },
});
export const CommentsByIdSuccess = (payload) => ({
  type: GET_COMMENTS_BY_ID_SUCCESS,
  payload: payload,
});
export const CommentsByIdFailure = (payload) => ({
  type: GET_COMMENTS_BY_ID_FAILURE,
  payload: payload,
});

export const AddCommentsByIdRequest = (postId, data) => ({
  type: POST_COMMENTS_BY_ID_REQUEST,
  payload: { postId, data },
});
export const AddCommentsByIdSuccess = (payload) => ({
  type: POST_COMMENTS_BY_ID_SUCCESS,
  payload: payload,
});
export const AddCommentsByIdFailure = (payload) => ({
  type: POST_COMMENTS_BY_ID_FAILURE,
  payload: payload,
});
