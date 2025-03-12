import { apiRequest } from "../../Api";

const Signup = async (data) => {
  try {
    const result = await apiRequest(`agency/register`, "POST", { data }, null);
    return result;
  } catch (error) {
    console.log("error", error.message);
  }
};
const TravelerSignup = async (data) => {
  try {
    const result = await apiRequest(
      `traveler/register`,
      "POST",
      { data },
      null
    );
    return result;
  } catch (error) {
    console.log("error", error.message);
  }
};
const login = async (data) => {
  console.log(data, "logindata");
  try {
    const result = await apiRequest("agency/login", "POST", { ...data }, null);
    return result;
  } catch (error) {
    console.log("error", error);
  }
};
const travelerlogin = async (data) => {
  console.log(data, "logindata");
  try {
    const result = await apiRequest("traveler/login", "POST", { ...data }, null);
    return result;
  } catch (error) {
    console.log("error", error);
  }
};

export { Signup, login, travelerlogin, TravelerSignup };
