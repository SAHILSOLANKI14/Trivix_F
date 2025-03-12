import { all, fork, put, call, takeLatest } from "redux-saga/effects";
import {
  CREATE_TWEET_REQUEST,
  GET_ALL_TWEET_REQUEST,
  GET_TWEET_BY_ID_REQUEST,
} from "../Types";
import {
  getAllTweetsFailure,
  getAllTweetsSuccess,
  getTweetsFailure,
  getTweetsSuccess,
} from "../Actions/index";
import { AllTweets, AllTweetsByID, CreateTweet } from "../Api";

function* handleGetAllTWeetByID(action) {
  const { Datas } = action.payload;
  try {
    const response = yield call(AllTweetsByID, Datas);
    yield put(getTweetsSuccess(response?.data));
  } catch (error) {
    console.log("Login Error:", error.message);
    yield put(getTweetsFailure(error.message));
  }
}
function* handleGetAllTWeet() {
  try {
    const response = yield call(AllTweets);
    yield put(getAllTweetsSuccess(response?.data));
  } catch (error) {
    console.log("Login Error:", error.message);
    yield put(getAllTweetsFailure(error.message));
  }
}
function* handleCreateTWeet(action) {
  const { data } = action.payload;
  try {
    const response = yield call(CreateTweet, data);
    yield put(getAllTweetsSuccess(response?.data));
  } catch (error) {
    console.log("Login Error:", error.message);
    yield put(getAllTweetsFailure(error.message));
  }
}

function* watchALLTweetsByID() {
  yield takeLatest(GET_TWEET_BY_ID_REQUEST, handleGetAllTWeetByID);
}
function* watchALLTweets() {
  yield takeLatest(GET_ALL_TWEET_REQUEST, handleGetAllTWeet);
}
function* watchCreateTweets() {
  yield takeLatest(CREATE_TWEET_REQUEST, handleCreateTWeet);
}

export default function* Tweets() {
  yield all([
    fork(watchALLTweetsByID),
    fork(watchALLTweets),
    fork(watchCreateTweets),
  ]);
}
