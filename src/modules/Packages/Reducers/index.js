import {
  GET_ALL_PACKAGES_FAILURE,
  GET_ALL_PACKAGES_SUCCESS,
  GET_ALL_PACKAGES_REQUEST,
  GET_DETAILS_PACKAGES_REQUEST,
  GET_DETAILS_PACKAGES_SUCCESS,
  GET_DETAILS_PACKAGES_FAILURE,
} from "../Types/index";

const initialData = {
  data: [],
  detailData: null, // Set to null instead of empty array, since it represents a single package
  loading: false,
  error: null,
};

export const AllpackagesReducer = (state = initialData, action) => {
  switch (action.type) {
    case GET_ALL_PACKAGES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ALL_PACKAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_ALL_PACKAGES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_DETAILS_PACKAGES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_DETAILS_PACKAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        detailData: action.payload,
        error: null,
      };
    case GET_DETAILS_PACKAGES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
