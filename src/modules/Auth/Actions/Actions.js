import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT,
  RESTORE_SESSION,
  TRAVELER_LOGIN_REQUEST,
  TRAVELER_LOGIN_SUCCESS,
  TRAVELER_LOGIN_FAILURE,
  TRAVELER_SIGNUP_FAILURE,
  TRAVELER_SIGNUP_REQUEST,
  TRAVELER_SIGNUP_SUCCESS,
} from "../Types/Types";

export const loginRequest = (finaldata) => ({
  type: LOGIN_REQUEST,
  payload: finaldata,
});

export const loginSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload: payload,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  error,
});

export const SignupRequest = (finaldata) => ({
  type: SIGNUP_REQUEST,
  payload: finaldata,
});

export const SignupSuccess = (payload) => ({
  type: SIGNUP_SUCCESS,
  payload: payload,
});

export const SignupFailure = (error) => ({
  type: TRAVELER_SIGNUP_FAILURE,
  error,
});

export const TravelerSignupRequest = (finaldata) => ({
  type: TRAVELER_SIGNUP_REQUEST,
  payload: finaldata,
});

export const TravelerSignupSuccess = (payload) => ({
  type: TRAVELER_SIGNUP_SUCCESS,
  payload: payload,
});

export const TravelerSignupFailure = (error) => ({
  type: SIGNUP_FAILURE,
  error,
});

export const TravelerloginRequest = (finaldata) => ({
  type: TRAVELER_LOGIN_REQUEST,
  payload: finaldata,
});

export const TravelerloginSuccess = (payload) => ({
  type: TRAVELER_LOGIN_SUCCESS,
  payload: payload,
});

export const TravelerloginFailure = (error) => ({
  type: TRAVELER_LOGIN_FAILURE,
  error,
});

export const restoreSession = () => ({
  type: RESTORE_SESSION,
});

export const logout = () => ({
  type: LOGOUT,
});
