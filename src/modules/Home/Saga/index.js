import { all, fork, put, call, takeLatest } from "redux-saga/effects";
import { GET_ALL_POSTS_REQUEST } from "../Types";
import { allPostsFailure, allPostsSuccess } from "../Actions/index";
import { Allposts } from "../Api";

function* handleGetAllPost() {
  try {
    const response = yield call(Allposts);
    yield put(allPostsSuccess(response?.data));
  } catch (error) {
    console.log("Login Error:", error.message);
    yield put(allPostsFailure(error.message));
  }
}

function* watchALLPosts() {
  yield takeLatest(GET_ALL_POSTS_REQUEST, handleGetAllPost);
}

export default function* posts() {
  yield all([fork(watchALLPosts)]);
}
