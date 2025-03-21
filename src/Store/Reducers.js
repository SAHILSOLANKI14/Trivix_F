// reducers/index.js
import { combineReducers } from "redux";
import authReducer from "../modules/Auth/Reducers/Reducers";
import { AllpackagesReducer } from "../modules/Packages/Reducers/index";
import { AllPostsReducer } from "../modules/Home/Reducers";
import { AllTweetReducers, ProfileReducer } from "../modules/Profile/Reducers";
const createRootReducer = () =>
  combineReducers({
    auth: authReducer,
    Allpackages: AllpackagesReducer,
    AllPost: AllPostsReducer,
    AllTweet: AllTweetReducers,
    profile: ProfileReducer,
  });

export default createRootReducer;
