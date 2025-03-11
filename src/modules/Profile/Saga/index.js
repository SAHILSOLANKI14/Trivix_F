import { all, fork, put, call, takeLatest } from "redux-saga/effects";
import { GET_TWEET_BY_ID_REQUEST } from "../Types";
import { getTweetsFailure, getTweetsSuccess } from "../Actions/index";
import { AllTweetsByID } from "../Api";

function* handleGetAllTWeet(action) {
  const { Datas } = action.payload;
  try {
    const response = yield call(AllTweetsByID, Datas);
    yield put(getTweetsSuccess(response?.data.packages));
  } catch (error) {
    console.log("Login Error:", error.message);
    yield put(getTweetsFailure(error.message));
  }
}

function* watchALLTweets() {
  yield takeLatest(GET_TWEET_BY_ID_REQUEST, handleGetAllTWeet);
}

export default function* Tweets() {
  yield all([fork(watchALLTweets)]);
}
