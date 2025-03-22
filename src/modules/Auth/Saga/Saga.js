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
import { apiRequest, login as apiLogin, logout as apiLogout } from "../Api/index";

// Auth state management functions from API client
const setAuthItem = (name, value) => {
  localStorage.setItem(name, value);
  // Also set as cookies for cross-tab support
  document.cookie = `${name}=${value};path=/;max-age=31536000;SameSite=Strict`;
};

const clearAuthItems = () => {
  const itemsToClear = ["token", "refreshToken", "userType", "userData", "userId", "agency", "traveler"];
  
  // Clear from localStorage
  itemsToClear.forEach(item => localStorage.removeItem(item));
  
  // Clear cookies
  itemsToClear.forEach(item => {
    document.cookie = `${item}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT;SameSite=Strict`;
  });
};

// Handle Login
function* handleLogin(action) {
  try {
    // Use the login function from API client
    const response = yield call(apiLogin, action.payload, "Agency");
    
    // Response is already stored in localStorage by API client
    yield put(loginSuccess(response.data));
    
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
    // Use the login function from API client
    const response = yield call(apiLogin, action.payload, "Traveler");
    
    // Response is already stored in localStorage by API client
    yield put(TravelerloginSuccess(response.data));
    
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
    const endpoint = "agency/signup";
    const response = yield call(apiRequest, endpoint, "POST", action.payload);
    
    yield put(SignupSuccess(response.data));
    
    // If signup automatically logs in, store auth data
    if (response.data.accessToken) {
      setAuthItem("token", response.data.accessToken);
      setAuthItem("refreshToken", response.data.refreshToken);
      setAuthItem("userType", "Agency");
      
      if (response.data.agency?._id) {
        setAuthItem("userId", response.data.agency._id);
        setAuthItem("agency", JSON.stringify(response.data.agency));
      }
    }
    
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
    const endpoint = "traveler/signup";
    const response = yield call(apiRequest, endpoint, "POST", action.payload);
    
    yield put(TravelerSignupSuccess(response.data));
    
    // If signup automatically logs in, store auth data
    if (response.data.accessToken) {
      setAuthItem("token", response.data.accessToken);
      setAuthItem("refreshToken", response.data.refreshToken);
      setAuthItem("userType", "Traveler");
      
      if (response.data.traveler?._id) {
        setAuthItem("userId", response.data.traveler._id);
        setAuthItem("traveler", JSON.stringify(response.data.traveler));
      }
    }
    
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
  const getAuthItem = (name) => {
    return document.cookie.split(';')
      .find(c => c.trim().startsWith(`${name}=`))
      ?.split('=')[1] || localStorage.getItem(name);
  };
  
  try {
    const token = getAuthItem("token");
    const userType = getAuthItem("userType");
    const userId = getAuthItem("userId");
    
    if (!token || !userType || !userId) {
      throw new Error("Session expired");
    }
    
    // Get user data from localStorage
    let userData = null;
    const userDataKey = userType === "Agency" ? "agency" : "traveler";
    const storedUserData = localStorage.getItem(userDataKey) || localStorage.getItem("userData");
    
    if (storedUserData) {
      userData = JSON.parse(storedUserData);
    } else {
      // If user data is not in localStorage, attempt to fetch it
      const endpoint = `${userType === "Agency" ? "agency" : "traveler"}/profile`;
      
      try {
        const response = yield call(apiRequest, endpoint);
        userData = response.data;
        
        // Store for future use
        setAuthItem(userDataKey, JSON.stringify(userData));
      } catch (fetchError) {
        console.error("Failed to fetch user data:", fetchError);
      }
    }
    
    if (!userData) {
      throw new Error("User data not available");
    }
    
    const authData = {
      accessToken: token,
      refreshToken: getAuthItem("refreshToken"),
      userType,
      userId,
      [userType === "Agency" ? "agency" : "traveler"]: userData
    };
    
    yield put(userType === "Agency" ? loginSuccess(authData) : TravelerloginSuccess(authData));
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
    // Call the API logout endpoint
    yield call(apiLogout);
  } catch (error) {
    console.log("Logout Error:", error.message);
  } finally {
    // Clear auth data regardless of API success/failure
    clearAuthItems();
    
    // No need to dispatch any action, the reducer should handle the LOGOUT action directly
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