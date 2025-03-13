import { apiRequest } from "../../Api";

export const Allposts = async () => {
  try {
    const result = await apiRequest(`posts`, "GET", null, null);
    return result;
  } catch (error) {
    console.log("error", error.message);
  }
};
export const GetagencyById = async (id) => {
  try {
    const result = await apiRequest(`agency/${id}`, "GET", null);
    return result;
  } catch (error) {
    console.log("error", error.message);
  }
};
export const GettravelerById = async (id) => {
  try {
    const result = await apiRequest(`traveler/${id}`, "GET", null);
    return result;
  } catch (error) {
    console.log("error", error.message);
  }
};
