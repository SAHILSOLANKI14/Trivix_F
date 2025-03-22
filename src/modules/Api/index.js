import axios from "axios";

const BASE_URL = process.env.REACT_APP_URL || process.env.REACT_APP_LOCAL_URL || "https://trivix-b.vercel.app/api/v1/";

// axios instance with credentials
const client = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

// Token refresh state
let isRefreshing = false;
let refreshSubscribers = [];

// Subscribe failed requests to be retried after token refresh
const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

// Execute all subscribers when token refresh completes
const onRefreshed = (token) => {
  refreshSubscribers.forEach(callback => callback(token));
  refreshSubscribers = [];
};

// Get the userType from cookies
const getUserTypeFromCookies = () => {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'userType') {
      return value;
    }
  }
  // Fallback to localStorage if cookie is not found
  return localStorage.getItem("userType");
};

// Attempt to refresh the access token
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const userType = getUserTypeFromCookies();
  
  if (!userType) {
    throw new Error("User type not available");
  }
  
  const endpoint = userType === "Agency" ? "agency/refreshToken" : "traveler/refreshToken";
  
  try {
    // Send refresh token in body as backup, primary method will be cookies
    const response = await axios.post(
      `${BASE_URL}${endpoint}`, 
      refreshToken ? { refreshToken } : {},
      { 
        headers: { userType },
        withCredentials: true 
      }
    );
    
    const { accessToken, refreshToken: newRefreshToken } = response.data.data;
    
    // Update stored tokens
    localStorage.setItem("token", accessToken);
    if (newRefreshToken) {
      localStorage.setItem("refreshToken", newRefreshToken);
    }
    
    return accessToken;
  } catch (error) {
    // Clear auth data on refresh failure
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userType");
    localStorage.removeItem("userData");
    throw error;
  }
};

// Response interceptor for handling 401 errors
client.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    // Only handle 401 errors that haven't been retried yet
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }
    
    // Mark as retried to prevent infinite loop
    originalRequest._retry = true;
    
    // If refresh is already in progress, add this request to queue
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        subscribeTokenRefresh(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(client(originalRequest));
        });
      });
    }
    
    isRefreshing = true;
    
    try {
      const newToken = await refreshAccessToken();
      
      // Update original request auth header
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      
      // Process any queued requests
      onRefreshed(newToken);
      
      // Retry original request
      return client(originalRequest);
    } catch (refreshError) {
      // Notify subscribers of failure
      refreshSubscribers = [];
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

// Add auth headers to all requests
client.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    const userType = getUserTypeFromCookies();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    if (userType) {
      config.headers.userType = userType;
    }
    
    return config;
  }
);

// Main API request function
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
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        ...headers
      }
    });
    
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Parse cookies after login to get values and store them in localStorage as backup
const parseCookiesAfterLogin = () => {
  const cookies = document.cookie.split(';');
  let userType = null;
  
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'userType') {
      userType = value;
      localStorage.setItem("userType", value);
      break;
    }
  }
  
  return userType;
};

// Authentication functions
export const login = async (credentials, userType) => {
  try {
    const endpoint = userType === "Agency" ? "agency/login" : "traveler/login";
    const response = await apiRequest(
      endpoint, 
      "POST", 
      credentials, 
      null, 
      { userType }
    );
    
    if (response.data) {
      // Store tokens in localStorage as backup
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      
      // Parse cookies to ensure userType is saved
      const cookieUserType = parseCookiesAfterLogin() || userType;
      localStorage.setItem("userType", cookieUserType);
      
      // Store user data
      const userData = response.data.user || response.data.agency || response.data.traveler;
      localStorage.setItem("userData", JSON.stringify(userData));
    }
    
    return response;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  const userType = getUserTypeFromCookies();
  const endpoint = userType === "Agency" ? "agency/logout" : "traveler/logout";
  
  try {
    await apiRequest(endpoint, "POST");
  } catch (error) {
    console.error("Logout API error:", error);
  } finally {
    // Always clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userType");
    localStorage.removeItem("userData");
  }
  
  return { success: true };
};

// Utility functions
export const isAuthenticated = () => {
  const hasToken = !!localStorage.getItem("token");
  const hasUserType = !!getUserTypeFromCookies() || !!localStorage.getItem("userType");
  
  return hasToken && hasUserType;
};

export const getUserType = () => {
  return getUserTypeFromCookies() || localStorage.getItem("userType");
};

export const getUserData = () => {
  const userData = localStorage.getItem("userData");
  return userData ? JSON.parse(userData) : null;
};

// Check what's in localStorage
console.log("Token:", localStorage.getItem("token"));
console.log("UserType:", localStorage.getItem("userType"));

// Check cookies
console.log("Cookies:", document.cookie);