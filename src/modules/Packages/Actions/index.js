import {
  GET_ALL_PACKAGES_FAILURE,
  GET_ALL_PACKAGES_SUCCESS,
  GET_ALL_PACKAGES_REQUEST,
  GET_DETAILS_PACKAGES_REQUEST,
  GET_DETAILS_PACKAGES_SUCCESS,
  GET_DETAILS_PACKAGES_FAILURE,
} from "../Types/index";

export const allPackagesRequest = (payload) => ({
  type: GET_ALL_PACKAGES_REQUEST,
  payload: payload,
});
export const allPackagesSuccess = (payload) => ({
  type: GET_ALL_PACKAGES_SUCCESS,
  payload: payload,
});
export const allPackagesFailure = (payload) => ({
  type: GET_ALL_PACKAGES_FAILURE,
  payload: payload,
});

export const detailPackagesRequest = (id) => ({
  type: GET_DETAILS_PACKAGES_REQUEST,
  payload: { id },
});
export const detailPackagesSuccess = (payload) => ({
  type: GET_DETAILS_PACKAGES_SUCCESS,
  payload: payload,
});
export const detailPackagesFailure = (payload) => ({
  type: GET_DETAILS_PACKAGES_FAILURE,
  payload: payload,
});
