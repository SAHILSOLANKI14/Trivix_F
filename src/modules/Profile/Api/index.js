import { apiRequest } from "../../Api";

export const AllTweetsByID = async (Datas) => {
  // userId=67cfc46bf50e1438ac1b15a2&userType=Traveler
  try {
    const result = await apiRequest(`tweets/user?`, "GET", null, Datas);
    return result;
  } catch (error) {
    console.log("error", error.message);
  }
};
