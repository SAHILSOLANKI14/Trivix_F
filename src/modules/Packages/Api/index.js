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
  try {
    const result = await apiRequest(`packages/${id}`, "GET", null, null);
    return result;
  } catch (error) {
    console.log("error", error.message);
  }
};
export const CreatepackagesApi = async (data) => {
  try {
    const result = await apiRequest(
      `packages/create`,
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
export const bookingpackagesApi = async (data) => {
  try {
    const result = await apiRequest(
      `bookings/book`,
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
