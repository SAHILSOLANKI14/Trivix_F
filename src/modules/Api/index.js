import axios from "axios";

const BASE_URL = process.env.REACT_APP_URL || process.env.REACT_APP_LOCAL_URL || "https://trivix-b.vercel.app/api/v1/";

// Create axios instance with credentials
const client = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

// Token refresh state management
let isRefreshing = false;
let refreshSubscribers = [];

// Auth state management
const getAuthItem = (name) => {
  return document.cookie.split(';')
    .find(c => c.trim().startsWith(`${name}=`))
    ?.split('=')[1] || localStorage.getItem(name);
};

const setAuthItem = (name, value) => {
  localStorage.setItem(name, value);
};

const clearAuthItems = () => {
  ["token", "refreshToken", "userType", "userData", "userId"].forEach(item => 
    localStorage.removeItem(item)
  );
};

// Refresh token logic
const refreshAccessToken = async () => {
  const refreshToken = getAuthItem("refreshToken");
  const userType = getAuthItem("userType");
  
  if (!userType) throw new Error("User type not available");
  
  const endpoint = `${userType === "Agency" ? "agency" : "traveler"}/refreshToken`;
  
  try {
    const response = await axios.post(
      `${BASE_URL}${endpoint}`, 
      refreshToken ? { refreshToken } : {},
      { headers: { userType }, withCredentials: true }
    );
    
    const { accessToken, refreshToken: newRefreshToken } = response.data.data;
    
    setAuthItem("token", accessToken);
    if (newRefreshToken) setAuthItem("refreshToken", newRefreshToken);
    
    return accessToken;
  } catch (error) {
    clearAuthItems();
    throw error;
  }
};

// Response interceptor for handling 401 errors
client.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }
    
    originalRequest._retry = true;
    
    if (isRefreshing) {
      return new Promise(resolve => {
        refreshSubscribers.push(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(client(originalRequest));
        });
      });
    }
    
    isRefreshing = true;
    
    try {
      const newToken = await refreshAccessToken();
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      
      refreshSubscribers.forEach(callback => callback(newToken));
      refreshSubscribers = [];
      
      return client(originalRequest);
    } catch (refreshError) {
      refreshSubscribers = [];
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

// Request interceptor to add auth headers
client.interceptors.request.use(config => {
  const token = getAuthItem("token");
  const userType = getAuthItem("userType");
  
  if (token) config.headers.Authorization = `Bearer ${token}`;
  if (userType) config.headers.userType = userType;
  
  return config;
});

// API request function
export const apiRequest = async (url, method = "GET", data = null, params = null, headers = {}) => {
  try {
    const response = await client.request({
      method, url, data, params,
      headers: { "Content-Type": "application/json", ...headers }
    });
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Auth functions
export const login = async (credentials, userType) => {
  const endpoint = `${userType === "Agency" ? "agency" : "traveler"}/login`;
  
  try {
    const response = await apiRequest(endpoint, "POST", credentials, null, { 
      userType, 
      "Content-Type": "application/x-www-form-urlencoded" 
    });
    
    if (response.data) {
      const { accessToken, refreshToken, user, agency, traveler } = response.data;
      const userData = user || agency || traveler;
      
      setAuthItem("token", accessToken);
      setAuthItem("refreshToken", refreshToken);
      setAuthItem("userType", userType);
      
      if (userData?._id) setAuthItem("userId", userData._id);
      setAuthItem("userData", JSON.stringify(userData));
    }
    
    return response;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  const userType = getAuthItem("userType");
  const endpoint = `${userType === "Agency" ? "agency" : "traveler"}/logout`;
  
  try {
    await apiRequest(endpoint, "POST");
  } catch (error) {
    console.error("Logout API error:", error);
  } finally {
    clearAuthItems();
  }
  
  return { success: true };
};

// Utility functions
export const isAuthenticated = () => {
  return !!getAuthItem("token") && !!getAuthItem("userType");
};

export const getCurrentUserType = () => getAuthItem("userType");

export const getUserData = () => {
  const userData = localStorage.getItem("userData");
  return userData ? JSON.parse(userData) : null;
};