import api from './api'; // Import the configured Axios instance
import { jwtDecode } from 'jwt-decode'; // Correct import of jwt-decode

// Utility function to handle API errors consistently
const handleApiError = (error) => {
  console.error('API Error:', error);
  const errorResponse = error.response?.data || { detail: error.message };
  throw errorResponse;
};

// Get the current user's advanced profile
export const getAdvancedProfile = async () => {
  try {
    const response = await api.get('/advanced-profile/profile/');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Update the current user's advanced profile
export const updateAdvancedProfile = async (profileData) => {
  try {
    const response = await api.patch('/advanced-profile/profile/', profileData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Get profile metrics (e.g., views, completeness)
export const getProfileMetrics = async () => {
  try {
    const response = await api.get('/advanced-profile/profile/metrics/');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Update the user's collaboration status
export const updateCollaborationStatus = async (status) => {
  try {
    const response = await api.post('/advanced-profile/profile/collaboration/', {
      collaboration_status: status,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Log out the user
export const logOut = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token found. Unable to log out.');
    }
    await api.post('/advanced-profile/logout/', { refresh_token: refreshToken });

    // Clear tokens from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  } catch (error) {
    handleApiError(error);
  }
};

// Decode JWT to check expiration time
const decodeToken = (token) => {
  try {
    return jwtDecode(token); // Updated to use the correct named import
  } catch (error) {
    return null;
  }
};

// Check if the access token is expired
const isAccessTokenExpired = (token) => {
  const decoded = decodeToken(token);
  if (!decoded) return true;
  const currentTime = Date.now() / 1000; // current time in seconds
  return decoded.exp < currentTime;
};

// Utility function to refresh the access token if expired
export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  if (!refreshToken) {
    throw new Error('Refresh token is missing. Please log in again.');
  }

  try {
    const response = await api.post('/auth/token/refresh/', { refresh: refreshToken });
    const { access } = response.data;

    // Update the access token
    localStorage.setItem('access_token', access);
    return access;
  } catch (error) {
    handleApiError(error);
  }
};

// Utility function to check if the user is logged in
export const isLoggedIn = () => {
  const accessToken = localStorage.getItem('access_token');
  return !!accessToken && !isAccessTokenExpired(accessToken); // Check if token exists and is not expired
};
