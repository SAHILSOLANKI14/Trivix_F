import axios from "axios";

const BASE_URL = "https://trivix-b.vercel.app/api/v1/";
const client = axios.create({
  withCredentials: false,
  baseURL: BASE_URL,
});

console.log(process.env.BASE_URL);

export const apiRequest = async (
  url,
  method = "GET",
  data = null,
  params = null,
  headers = {}
) => {
  console.log(url);
  try {
    console.log(url);

    const token = localStorage.getItem("user");

    const config = {
      method,
      url,
      params,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
        ...headers,
      },
      data,
    };
    const response = await client.request(config);
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};
