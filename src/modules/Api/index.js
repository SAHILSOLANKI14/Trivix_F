import axios from "axios";

const BASE_URL =
  process.env.REACT_APP_URL ||
  process.env.REACT_APP_LOCAL_URL ||
  "https://trivix-b.vercel.app/api/v1/";

const client = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Utility functions to handle auth items
const getAuthItem = (name) => {
  return (
    document.cookie
      .split("; ")
      .find((c) => c.startsWith(`${name}=`))
      ?.split("=")[1] || localStorage.getItem(name)
  );
};

const setAuthItem = (name, value) => {
  localStorage.setItem(name, value);
};

const clearAuthItems = () => {
  ["token", "refreshToken", "userType", "userData", "userId"].forEach((item) =>
    localStorage.removeItem(item)
  );
};

// Token refresh logic
const refreshAccessToken = async () => {
  const refreshToken = getAuthItem("refreshToken");
  const userType = getAuthItem("userType");
  if (!userType) throw new Error("User type not available");

  const endpoint = `${
    userType === "Agency" ? "agency" : "traveler"
  }/refreshToken`;

  try {
    const response = await axios.post(
      `${BASE_URL}${endpoint}`,
      { refreshToken },
      { headers: { userType }, withCredentials: true }
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data.data;
    setAuthItem("token", accessToken);
    if (newRefreshToken) setAuthItem("refreshToken", newRefreshToken);

    // Update axios default headers
    client.defaults.headers.Authorization = `Bearer ${accessToken}`;

    return accessToken;
  } catch (error) {
    clearAuthItems();
    throw error;
  }
};

// Axios response interceptor for handling 401 errors
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }
    originalRequest._retry = true;

    try {
      const newToken = await refreshAccessToken();
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return client(originalRequest);
    } catch (refreshError) {
      clearAuthItems();
      return Promise.reject(refreshError);
    }
  }
);

// Axios request interceptor to attach token and userType
client.interceptors.request.use((config) => {
  const token = getAuthItem("token");
  const userType = getAuthItem("userType");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  if (userType) config.headers.userType = userType;
  return config;
});

// API request function
export const apiRequest = async (
  url,
  method = "GET",
  data = null,
  params = null,
  headers = {}
) => {
  try {
    const response = await client.request({
      method,
      url,
      data,
      params,
      headers: { "Content-Type": "application/json", ...headers },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Auth API Functions
export const loginApi = async (credentials, userType) => {
  const response = await apiRequest(
    `${userType === "Agency" ? "agency" : "traveler"}/login`,
    "POST",
    credentials
  );

  const { token, refreshToken } = response.data;
  if (token) {
    setAuthItem("token", token);
    setAuthItem("refreshToken", refreshToken);
    setAuthItem("userType", userType);

    // Update axios instance immediately
    client.defaults.headers.Authorization = `Bearer ${token}`;
  }
  return response;
};

export const signupApi = (data, userType) =>
  apiRequest(
    `${userType === "Agency" ? "agency" : "traveler"}/auth/signup`,
    "POST",
    data
  );

export const logoutApi = async () => {
  const userType = getAuthItem("userType");
  await apiRequest(
    `${userType === "Agency" ? "agency" : "traveler"}/logout`,
    "POST"
  );
  clearAuthItems();
  window.location.href = "/auth/login"; // Redirect to login page after logout
};
