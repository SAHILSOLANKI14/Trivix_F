import { apiRequest } from "../../Api";

export const Allposts = async () => {
  try {
    const result = await apiRequest(`posts`, "GET", null, null);
    return result;
  } catch (error) {
    console.log("error", error.message);
  }
};
