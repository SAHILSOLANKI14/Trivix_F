import { all, fork, put, call, takeLatest, select } from "redux-saga/effects";
import {
  CREATE_TWEET_REQUEST,
  GET_AGENCY_BY_ID_REQUEST,
  GET_ALL_TWEET_REQUEST,
  GET_TRAVELER_BY_ID_REQUEST,
  GET_TWEET_BY_ID_REQUEST,
} from "../Types";
import {
  agencyByIdFailure,
  agencyByIdSuccess,
  getAllTweetsFailure,
  getAllTweetsSuccess,
  getTweetsFailure,
  getTweetsSuccess,
  travelerByIdFailure,
  travelerByIdSuccess,
} from "../Actions/index";
import { AllTweets, AllTweetsByID, CreateTweet } from "../Api";
import { GetagencyById, GettravelerById } from "../../Home/Api";

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
function* handleprofileAgencyByID(action) {
  const { id } = action.payload;
  try {
    const response = yield call(GetagencyById, id);
    yield put(agencyByIdSuccess(response?.data));
  } catch (error) {
    console.log("Login Error:", error.message);
    yield put(agencyByIdFailure(error.message));
  }
}
function* handleprofileTravelerByID(action) {
  const { id } = action.payload;
  try {
    const response = yield call(GettravelerById, id);
    yield put(travelerByIdSuccess(response?.data));
  } catch (error) {
    console.log("Login Error:", error.message);
    yield put(travelerByIdFailure(error.message));
  }
}
function* handleGetAllTweet(action) {
  try {
    const { page, limit } = action.payload;
    const data = {
      page,
      limit,
    };
    const response = yield call(AllTweets, data);

    const existingTweets = yield select(
      (state) => state.AllTweet?.AllTWeetData?.tweets || []
    );

    yield put(
      getAllTweetsSuccess({
        tweets: [...existingTweets, ...response?.data?.tweets],
        hasMore: response?.data?.hasMore,
      })
    );
  } catch (error) {
    console.error("Error fetching tweets:", error.message);
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
  yield takeLatest(GET_ALL_TWEET_REQUEST, handleGetAllTweet);
}
function* watchCreateTweets() {
  yield takeLatest(CREATE_TWEET_REQUEST, handleCreateTWeet);
}
function* watchTravelerById() {
  yield takeLatest(GET_TRAVELER_BY_ID_REQUEST, handleprofileTravelerByID);
}
function* watchAgencyById() {
  yield takeLatest(GET_AGENCY_BY_ID_REQUEST, handleprofileAgencyByID);
}

export default function* Tweets() {
  yield all([
    fork(watchALLTweetsByID),
    fork(watchALLTweets),
    fork(watchCreateTweets),
    fork(watchTravelerById),
    fork(watchAgencyById),
  ]);
}
