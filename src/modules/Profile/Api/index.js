import { apiRequest } from "../../Api";

export const AllTweetsByID = async (Datas) => {
  try {
    const result = await apiRequest(`tweets/user?`, "GET", null, Datas);
    return result;
  } catch (error) {
    console.log("error", error.message);
  }
};
export const AllTweets = async (data) => {
  try {
    const result = await apiRequest(`tweets`, "GET", null, { ...data });
    return result;
  } catch (error) {
    console.log("error", error.message);
  }
};
export const CreateTweet = async (data) => {
  try {
    const result = await apiRequest(
      `tweets/create`,
      "POST",
      data,
      null,
      {},
      true
    );
    return result;
  } catch (error) {
    console.log("error", error.message);
  }
};

export const getFollowers = async (userName) => {
  try {
    const result = await apiRequest(
      `follow/${userName}/followers`,
      "GET",
      null,
      null
    );
    return result;
  } catch (error) {
    console.log("error", error.message);
  }
};
export const toggleFollow = async (userName) => {
  try {
    const result = await apiRequest(
      `follow/${userName}/togglefollow`,
      "POST",
      null,
      null,
      {},
      true
    );
    return result;
  } catch (error) {
    console.log("error", error.message);
  }
};
export const toggleUnFollow = async (userName) => {
  try {
    const result = await apiRequest(
      `follow/${userName}/togglefollow`,
      "POST",
      null,
      null
    );
    return result;
  } catch (error) {
    console.log("error", error.message);
  }
};
export const getFollowings = async (userName) => {
  try {
    const result = await apiRequest(
      `follow/${userName}/followings`,
      "GET",
      null,
      null
    );
    return result;
  } catch (error) {
    console.log("error", error.message);
  }
};

export const GetCurrentLogedInAgency = async (Datas) => {
  try {
    const result = await apiRequest(`agency/currentAgency`, "GET", null, Datas);
    return result;
  } catch (error) {
    console.log("error", error.message);
  }
};
