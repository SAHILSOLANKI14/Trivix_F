// sagas/index.js
import { all } from "redux-saga/effects";
import authSagas from "../modules/Auth/Saga/Saga";
import packages from "../modules/Packages/Saga";
import posts from "../modules/Home/Saga";
import Tweets from "../modules/Profile/Saga";
function* rootSaga() {
  yield all([authSagas(), packages(), posts(), Tweets()]);
}

export default rootSaga;
