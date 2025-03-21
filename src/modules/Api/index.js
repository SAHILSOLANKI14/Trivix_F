import axios from "axios";

// const BASE_URL = "https://trivix-b.vercel.app/api/v1/";
const BASE_URL = "http://localhost:8000/api/v1/";

const client = axios.create({
  baseURL: BASE_URL,
});

console.log(process.env.BASE_URL);

export const apiRequest = async (
  url,
  method = "GET",
  data = null,
  params = null,
  headers = {},
  withCredentials = false // New parameter to toggle credentials per request
) => {
  try {
    const token = localStorage.getItem("user");

    const config = {
      method,
      url,
      params,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/x-www-form-urlencoded",
        ...headers,
      },
      data,
      withCredentials, // Dynamically set per request
    };

    const response = await client.request(config);
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};
