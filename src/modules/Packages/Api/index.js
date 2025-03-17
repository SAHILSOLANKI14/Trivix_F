import { apiRequest } from "../../Api";

export const Allpackages = async (pagination) => {
  try {
    const result = await apiRequest(`packages`, "GET", null, pagination);
    return result;
  } catch (error) {
    console.log("error", error.message);
  }
};
export const detailpackages = async (id) => {
  console.log(id);
  try {
    const result = await apiRequest(`packages/${id}`, "GET", null, null);
    return result;
  } catch (error) {
    console.log("error", error.message);
  }
};
