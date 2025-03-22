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

// Auth state management functions
const setAuthItem = (name, value) => {
  localStorage.setItem(name, value);
  Cookies.set(name, value, { path: '/', expires: 365, sameSite: 'strict' });
};

const clearAuthItems = () => {
  const itemsToClear = ["token", "refreshToken", "userType", "userData", "userId", "agency", "traveler", "accessToken", "user"];
  
  // Clear from localStorage
  itemsToClear.forEach(item => localStorage.removeItem(item));
  
  // Clear cookies
  itemsToClear.forEach(item => {
    Cookies.remove(item, { path: '/' });
  });
};

// Handle Login
function* handleLogin(action) {
  try {
    const response = yield call(login, action.payload);
    yield put(loginSuccess(response.data));
    
    // Store auth data
    localStorage.setItem("user", response.data.accessToken);
    localStorage.setItem("agency", JSON.stringify(response?.data?.agency));
    Cookies.set("accessToken", response.data.accessToken);
    Cookies.set("refreshToken", response.data.refreshToken);
    Cookies.set("userType", response.data.userType);
    Cookies.set("userId", response.data?.agency?._id);
    
    if (action.payload.toastCallback) {
      action.payload.toastCallback("Login successful", "success");
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
    
    // Store auth data
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
    
    // Store auth data if signup automatically logs in
    localStorage.setItem("user", response.data.accessToken);
    Cookies.set("user", response.data.accessToken);
    
    if (action.payload.toastCallback) {
      action.payload.toastCallback("Signup successful!", "success");
    }
  } catch (error) {
    console.log("Signup Error:", error.message);
    yield put(SignupFailure(error.message));
    
    if (action.payload.toastCallback) {
      action.payload.toastCallback("Signup failed", "error");
    }
  }
}

// Handle Traveler Signup
function* handleTravelerSignup(action) {
  try {
    const response = yield call(TravelerSignup, action.payload);
    yield put(TravelerSignupSuccess(response.data));
    
    // Store auth data if signup automatically logs in
    localStorage.setItem("user", response.data.accessToken);
    Cookies.set("user", response.data.accessToken);
    
    if (action.payload.toastCallback) {
      action.payload.toastCallback("Signup successful!", "success");
    }
  } catch (error) {
    console.log("Traveler Signup Error:", error.message);
    yield put(TravelerSignupFailure(error.message));
    
    if (action.payload.toastCallback) {
      action.payload.toastCallback("Signup failed!", "error");
    }
  }
}

// Handle Restore Session
function* handleRestoreSession() {
  try {
    const accessToken = Cookies.get("accessToken");
    const userType = Cookies.get("userType");
    const userId = Cookies.get("userId");

    // Retrieve stored agency or traveler data
    const agencyData = localStorage.getItem("agency");
    const travelerData = localStorage.getItem("traveler");

    if (accessToken && userId) {
      let userData = null;

      if (userType === "agency" && agencyData) {
        userData = JSON.parse(agencyData);
      } else if (userType === "traveler" && travelerData) {
        userData = JSON.parse(travelerData);
      }

      if (!userData) throw new Error("Session expired or user data missing");

      const authData = {
        accessToken,
        refreshToken: Cookies.get("refreshToken"),
        userType,
        userId,
        [userType]: userData
      };

      yield put(
        userType === "agency" ? loginSuccess(authData) : TravelerloginSuccess(authData)
      );
    } else {
      throw new Error("Session expired");
    }
  } catch (error) {
    console.error("Session Restore Error:", error.message);
    yield put(loginFailure(error.message));
    
    // Clear any partial auth data
    clearAuthItems();
  }
}

// Logout Function
function* handleLogout() {
  try {
    // No API logout call in the original code, keeping it that way
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("userType");
    Cookies.remove("userId");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("agency");
    localStorage.removeItem("traveler");
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
  yield takeLatest(LOGOUT, handleLogout);
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