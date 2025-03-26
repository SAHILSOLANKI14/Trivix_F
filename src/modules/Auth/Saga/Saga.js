import { all, fork, put, call, takeLatest } from "redux-saga/effects";
import {
  LOGIN_REQUEST,
  LOGOUT,
  SIGNUP_REQUEST,
  TRAVELER_LOGIN_REQUEST,
  TRAVELER_SIGNUP_REQUEST,
} from "../Types/Types";
import {
  loginSuccess,
  loginFailure,
  SignupSuccess,
  SignupFailure,
  TravelerSignupSuccess,
  TravelerSignupFailure,
  TravelerloginSuccess,
  TravelerloginFailure,
} from "../Actions/Actions";
import { login, Signup, travelerlogin, TravelerSignup } from "../Api/index";
import Cookies from "js-cookie";

// Handle Login
function* handleLogin(action) {
  try {
    const response = yield call(login, action.payload, "Agency");
    if(response)
    yield put(loginSuccess(response.data));
    localStorage.setItem("user", response.data.accessToken);
    localStorage.setItem("agency", JSON.stringify(response?.data?.agency));
    Cookies.set("accessToken", response.data.accessToken);
    Cookies.set("refreshToken", response.data.refreshToken);
    Cookies.set("userType", response.data.userType);
    Cookies.set("userId", response.data?.agency?._id);

    if (action.payload.toastCallback) {
      action.payload.toastCallback("Login successful", "success");
    }
    if(response.data?.traveler?.accessToken || response.data?.agency?.accessToken){
      window.location.reload();
    }
  } catch (error) {
    yield put(loginFailure(error.message));
    if (action.payload.toastCallback) {
      action.payload.toastCallback("Login failed", "error");
    }
  }
}

// Handle Traveler Login
function* handleTravelerLogin(action) {
  try {
    const response = yield call(travelerlogin, action.payload, "Traveler");
    yield put(TravelerloginSuccess(response.data));
    localStorage.setItem("user", response.data.accessToken);
    localStorage.setItem("traveler", JSON.stringify(response?.data?.traveler));
    Cookies.set("accessToken", response.data.accessToken);
    Cookies.set("refreshToken", response.data.refreshToken);
    Cookies.set("userType", response.data.userType);
    Cookies.set("userId", response.data?.traveler?._id);

    if (action.payload.toastCallback) {
      action.payload.toastCallback("Traveler login successful", "success");
    }
  } catch (error) {
    yield put(TravelerloginFailure(error.message));
    if (action.payload.toastCallback) {
      action.payload.toastCallback("Traveler login failed", "error");
    }
  }
}

// Handle Signup
function* handleSignup(action) {
  try {
    const response = yield call(Signup, action.payload, "Agency");
    yield put(SignupSuccess(response.data));
    localStorage.setItem("user", response.data.accessToken);
    Cookies.set("user", response.data.accessToken);
    if (action.payload.toastCallback) {
      action.payload.toastCallback("Signup successful!", "success");
    }
  } catch (error) {
    yield put(SignupFailure(error.message));
    if (action.payload.toastCallback) {
      action.payload.toastCallback("Signup failed", "error");
    }
  }
}

// Handle Traveler Signup
function* handleTravelerSignup(action) {
  try {
    const response = yield call(TravelerSignup, action.payload, "Traveler");
    yield put(TravelerSignupSuccess(response.data));
    localStorage.setItem("user", response.data.accessToken);
    Cookies.set("user", response.data.accessToken);
    if (action.payload.toastCallback) {
      action.payload.toastCallback("Signup successful!", "success");
    }
  } catch (error) {
    yield put(TravelerSignupFailure(error.message));
    if (action.payload.toastCallback) {
      action.payload.toastCallback("Signup Failed!", "error");
    }
  }
}

// Handle Logout
function* handleLogout() {
  try {
    // yield call(logoutApi);
  } catch (error) {
    console.error("Logout Error:", error.message);
  }
}

// Watcher Sagas
function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, handleLogin);
}
function* watchTravelerLogin() {
  yield takeLatest(TRAVELER_LOGIN_REQUEST, handleTravelerLogin);
}
function* watchSignup() {
  yield takeLatest(SIGNUP_REQUEST, handleSignup);
}
function* watchTravelerSignup() {
  yield takeLatest(TRAVELER_SIGNUP_REQUEST, handleTravelerSignup);
}
function* watchLogout() {
  yield takeLatest(LOGOUT, handleLogout);
}

// Root Saga
export default function* authSagas() {
  yield all([
    fork(watchLogin),
    fork(watchSignup),
    fork(watchLogout),
    fork(watchTravelerLogin),
    fork(watchTravelerSignup),
  ]);
}
