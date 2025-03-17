import { all, fork, put, call, takeLatest } from "redux-saga/effects";
import {
  GET_ALL_PACKAGES_REQUEST,
  GET_DETAILS_PACKAGES_REQUEST,
} from "../Types";
import {
  allPackagesSuccess,
  allPackagesFailure,
  detailPackagesFailure,
  detailPackagesSuccess,
} from "../Actions";
import { Allpackages, detailpackages } from "../Api";

function* handleGetAllPackages(action) {
  const { pagination } = action.payload;
  try {
    const response = yield call(Allpackages, pagination);
    yield put(allPackagesSuccess(response?.data.packages));
    console.log("calll", response);
  } catch (error) {
    console.log("Login Error:", error.message);
    yield put(allPackagesFailure(error.message));
  }
}
function* handleGetDetailDataPackages(action) {
  const { id } = action.payload;
  try {
    const response = yield call(detailpackages, id);
    yield put(detailPackagesSuccess(response.data));
  } catch (error) {
    console.log("Login Error:", error.message);
    yield put(detailPackagesFailure(error.message));
  }
}

function* watchALLpackages() {
  yield takeLatest(GET_ALL_PACKAGES_REQUEST, handleGetAllPackages);
}
function* watchDetailpackages() {
  yield takeLatest(GET_DETAILS_PACKAGES_REQUEST, handleGetDetailDataPackages);
}
export default function* packages() {
  yield all([fork(watchALLpackages), fork(watchDetailpackages)]);
}
