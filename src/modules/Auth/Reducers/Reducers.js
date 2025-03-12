import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  RESTORE_SESSION,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  TRAVELER_LOGIN_FAILURE,
  TRAVELER_LOGIN_REQUEST,
  TRAVELER_LOGIN_SUCCESS,
  TRAVELER_SIGNUP_FAILURE,
  TRAVELER_SIGNUP_REQUEST,
  TRAVELER_SIGNUP_SUCCESS,
} from "../Types/Types";
import { REHYDRATE } from "redux-persist";
const initialState = {
  Data: [],
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
    case LOGIN_REQUEST:
    case TRAVELER_LOGIN_REQUEST:
    case TRAVELER_SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
    case TRAVELER_LOGIN_SUCCESS:
    case TRAVELER_SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        Data: action.payload,
        error: null,
      };
    case SIGNUP_FAILURE:
    case LOGIN_FAILURE:
    case TRAVELER_LOGIN_FAILURE:
    case TRAVELER_SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case RESTORE_SESSION:
      return { ...state, loading: false };
    case LOGOUT:
      return state;
    default:
      return state;
  }
};

export default authReducer;
