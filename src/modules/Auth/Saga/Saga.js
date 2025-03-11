import { all, fork, put, call, takeLatest } from "redux-saga/effects";
import {
  LOGIN_REQUEST,
  LOGOUT,
  RESTORE_SESSION,
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
    const response = yield call(login, action.payload);
    yield put(loginSuccess(response.data));
    localStorage.setItem("user", response.data.accessToken);
    Cookies.set("accessToken", response.data.accessToken);
    Cookies.set("refreshToken", response.data.refreshToken);
    Cookies.set("userType", response.data.userType);

    if (action.payload.toastCallback) {
      action.payload.toastCallback("Login successful!", "success");
    }
  } catch (error) {
    console.log("Login Error:", error.message);
    yield put(loginFailure(error.message));

    if (action.payload.toastCallback) {
      action.payload.toastCallback("Login failed", "error");
    }
  }
}

function* handleTravelerLogin(action) {
  try {
    const response = yield call(travelerlogin, action.payload);
    yield put(TravelerloginSuccess(response.data));
    localStorage.setItem("user", response.data.accessToken);
    Cookies.set("accessToken", response.data.accessToken);
    Cookies.set("refreshToken", response.data.refreshToken);
    Cookies.set("userType", response.data.userType);

    if (action.payload.toastCallback) {
      action.payload.toastCallback("Traveler login successful!", "success");
    }
  } catch (error) {
    console.log("Traveler Login Error:", error.message);
    yield put(TravelerloginFailure(error.message));

    if (action.payload.toastCallback) {
      action.payload.toastCallback("Traveler login failed", "error");
    }
  }
}

// Handle Signup
function* handleSignup(action) {
  try {
    const response = yield call(Signup, action.payload);
    yield put(SignupSuccess(response.data));
    localStorage.setItem("user", response.data.accessToken);
    Cookies.set("user", response.data.accessToken);
    if (action.payload.toastCallback) {
      action.payload.toastCallback(" Signup successful!", "success");
    }
  } catch (error) {
    console.log("Signup Error:", error.message);
    yield put(SignupFailure(error.message));
    if (action.payload.toastCallback) {
      action.payload.toastCallback("Login failed", "error");
    }
  }
}

// Handle Traveler Signup (Fixed Action Dispatch)
function* handleTravelerSignup(action) {
  try {
    const response = yield call(TravelerSignup, action.payload);
    yield put(TravelerSignupSuccess(response.data));
    localStorage.setItem("user", response.data.accessToken);
    Cookies.set("user", response.data.accessToken);
    if (action.payload.toastCallback) {
      action.payload.toastCallback(" Signup successful!", "success");
    }
  } catch (error) {
    console.log("Traveler Signup Error:", error.message);
    yield put(TravelerSignupFailure(error.message));
    if (action.payload.toastCallback) {
      action.payload.toastCallback("Signup Failed!", "success");
    }
  }
}

// Handle Restore Session
function* handleRestoreSession() {
  try {
    const token = localStorage.getItem("accessToken");
    if (token) {
      yield put(loginSuccess({ accessToken: token }));
    }
  } catch (error) {
    console.error("Session Restore Error:", error.message);
    yield put(loginFailure(error.message));
  }
}

// Logout Function (Fixed to Remove Local Storage)
function* logout() {
  try {
    Cookies.remove("accessToken");
    localStorage.removeItem("accessToken");
  } catch (error) {
    console.log("Logout Error:", error.message);
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
  yield takeLatest(LOGOUT, logout);
}
function* watchRestoreSession() {
  yield takeLatest(RESTORE_SESSION, handleRestoreSession);
}

// Root Saga
export default function* authSagas() {
  yield all([
    fork(watchLogin),
    fork(watchSignup),
    fork(watchRestoreSession),
    fork(watchLogout),
    fork(watchTravelerLogin),
    fork(watchTravelerSignup),
  ]);
}
