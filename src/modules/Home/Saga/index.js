import { all, fork, put, call, takeLatest } from "redux-saga/effects";
import { GET_ALL_POSTS_REQUEST, GET_COMMENTS_BY_ID_REQUEST } from "../Types";
import {
  allPostsFailure,
  allPostsSuccess,
  CommentsByIdFailure,
  CommentsByIdSuccess,
} from "../Actions/index";
import { Allposts, GetCommentsById } from "../Api";

function* handleGetAllPost() {
  try {
    const response = yield call(Allposts);
    yield put(allPostsSuccess(response?.data));
  } catch (error) {
    console.log("Login Error:", error.message);
    yield put(allPostsFailure(error.message));
  }
}
function* handleCommentsByIdPost(action) {
  const { id } = action.payload;
  try {
    const response = yield call(GetCommentsById, id);
    yield put(CommentsByIdSuccess(response?.statusCode));
  } catch (error) {
    console.log("Login Error:", error.message);
    yield put(CommentsByIdFailure(error.message));
  }
}

function* watchALLPosts() {
  yield takeLatest(GET_ALL_POSTS_REQUEST, handleGetAllPost);
}
function* watchComments() {
  yield takeLatest(GET_COMMENTS_BY_ID_REQUEST, handleCommentsByIdPost);
}

export default function* posts() {
  yield all([fork(watchALLPosts), fork(watchComments)]);
}
