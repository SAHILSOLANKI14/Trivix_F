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

// Parse cookie value by name
const getCookieValue = (name) => {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
};

// Get the user's access token (prioritize cookie, fallback to localStorage)
const getAccessToken = () => {
  return getCookieValue('accessToken') || localStorage.getItem("token");
};

// Get the user's refresh token (prioritize cookie, fallback to localStorage)
const getRefreshToken = () => {
  return getCookieValue('refreshToken') || localStorage.getItem("refreshToken");
};

// Get the userType (prioritize cookie, fallback to localStorage)
const getUserType = () => {
  return getCookieValue('userType') || localStorage.getItem("userType");
};

// Get userId (prioritize cookie, fallback to localStorage)
const getUserId = () => {
  return getCookieValue('userId') || localStorage.getItem("userId");
};

// Synchronize tokens from cookies to localStorage for backup
const syncTokensToLocalStorage = () => {
  const accessToken = getCookieValue('accessToken');
  const refreshToken = getCookieValue('refreshToken');
  const userType = getCookieValue('userType');
  const userId = getCookieValue('userId');
  
  if (accessToken) localStorage.setItem("token", accessToken);
  if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
  if (userType) localStorage.setItem("userType", userType);
  if (userId) localStorage.setItem("userId", userId);
};

// Attempt to refresh the access token
const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  const userType = getUserType();
  
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
    
    // Update stored tokens in localStorage as backup
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
    localStorage.removeItem("userId");
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
    // Always sync tokens from cookies to localStorage first
    syncTokensToLocalStorage();
    
    const token = getAccessToken();
    const userType = getUserType();
    
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
        "Content-Type": "application/json",
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
const syncCookiesAfterLogin = () => {
  syncTokensToLocalStorage();
  return getUserType();
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
      { 
        userType,
        "Content-Type": "application/x-www-form-urlencoded" 
      }
    );
    
    if (response.data) {
      // Sync cookies to localStorage
      syncCookiesAfterLogin();
      
      // Also store explicitly as backup
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("userType", userType);
      
      // Store user data
      const userData = response.data.user || response.data.agency || response.data.traveler;
      if (userData && userData._id) {
        localStorage.setItem("userId", userData._id);
      }
      localStorage.setItem("userData", JSON.stringify(userData));
    }
    
    return response;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  const userType = getUserType();
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
    localStorage.removeItem("userId");
  }
  
  return { success: true };
};

// Utility functions
export const isAuthenticated = () => {
  // Always sync first to ensure localStorage has latest values
  syncTokensToLocalStorage();
  
  const hasToken = !!getAccessToken();
  const hasUserType = !!getUserType();
  
  return hasToken && hasUserType;
};

export const getCurrentUserType = () => {
  // Sync first to ensure localStorage has latest values
  syncTokensToLocalStorage();
  return getUserType();
};

export const getUserData = () => {
  const userData = localStorage.getItem("userData");
  return userData ? JSON.parse(userData) : null;
};

// Initialize by syncing tokens from cookies on load
syncTokensToLocalStorage();

// Debug logs - these should now show values from cookies
console.log("Token:", getAccessToken());
console.log("UserType:", getUserType());
console.log("Cookies:", document.cookie);