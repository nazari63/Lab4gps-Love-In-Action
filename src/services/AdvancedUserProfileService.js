import api from './api'; // Importing the api instance

// Fetch the user profile from the backend
export const getUserProfile = async () => {
  try {
    const response = await api.get('/advanced-profile/profile/'); // Correct endpoint without '/lab4gps'
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error; // Rethrow the error so it can be handled by the calling component
  }
};

// Update the user profile
export const updateUserProfile = async (profileData) => {
  try {
    const response = await api.put('/advanced-profile/profile/', profileData); // Correct endpoint without '/lab4gps'
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error; // Rethrow the error for further handling
  }
};

// Fetch the profile metrics (views, completeness)
export const getProfileMetrics = async () => {
  try {
    const response = await api.get('/advanced-profile/profile/metrics/'); // Correct endpoint without '/lab4gps'
    return response.data;
  } catch (error) {
    console.error("Error fetching profile metrics:", error);
    throw error;
  }
};

// Update collaboration status
export const updateCollaborationStatus = async (status) => {
  try {
    const response = await api.post('/advanced-profile/profile/collaboration/', {
      collaboration_status: status,
    }); // Correct endpoint without '/lab4gps'
    return response.data;
  } catch (error) {
    console.error("Error updating collaboration status:", error);
    throw error;
  }
};

// Example for logging out user (if needed)
export const logoutUser = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      await api.post('/advanced-profile/logout/', { refresh_token: refreshToken }); // Correct endpoint without '/lab4gps'
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/login'; // Redirect to login after logout
    }
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};
