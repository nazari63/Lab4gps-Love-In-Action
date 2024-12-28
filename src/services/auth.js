import api from "./api";

/**
 * Register a new user
 * @param {Object} formData - User registration details
 * @returns {Promise} - Server response data
 */
export const registerUser = async (formData) => {
  try {
    const response = await api.post("/auth/signup/", formData);
    return response.data;
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error.response?.data || error.message;
  }
};

/**
 * Verify OTP to activate user account
 * @param {string} email - User's email
 * @param {string} otp - OTP sent to the user's email
 * @returns {Promise} - Server response data
 */
export const verifyOtp = async (email, otp) => {
  try {
    const response = await api.post("/auth/verify-otp/", { email, otp });
    return response.data;
  } catch (error) {
    console.error("Error during OTP verification:", error);
    throw error.response?.data || error.message;
  }
};

/**
 * Login user and obtain JWT tokens
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise} - Server response data containing tokens
 */
export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/auth/login/", { email, password });
    const { access, refresh } = response.data;

    // Store tokens in localStorage
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);

    return response.data;
  } catch (error) {
    console.error("Error during user login:", error);
    throw error.response?.data || error.message;
  }
};

/**
 * Refresh the access token
 * @param {string} refreshToken - JWT refresh token
 * @returns {Promise} - Server response data containing a new access token
 */
export const refreshToken = async (refreshToken) => {
  try {
    const response = await api.post("/auth/token/refresh/", { refresh: refreshToken });
    localStorage.setItem("accessToken", response.data.access); // Save new access token
    return response.data;
  } catch (error) {
    console.error("Error during token refresh:", error);
    throw error.response?.data || error.message;
  }
};

/**
 * Fetch authenticated user's profile
 * @returns {Promise} - Server response data containing user profile details
 */
export const getUserProfile = async () => {
  try {
    const response = await api.get("/auth/profile/");
    console.log("User Profile API Response:", response.data); // Debugging log

    const { first_name, last_name, email, username, profile_picture, is_verified, registration_date } = response.data;

    // Validate required fields
    if (!first_name || !last_name) {
      console.warn("Missing first_name or last_name in user profile:", response.data);
      throw new Error("User profile is missing required fields: first_name or last_name.");
    }

    return {
      first_name,
      last_name,
      email,
      username,
      profile_picture,
      is_verified,
      registration_date,
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error.response?.data || error.message;
  }
};

/**
 * Update user profile details
 * @param {Object} profileData - Updated user details (first name, last name, email, username)
 * @returns {Promise} - Server response data
 */
export const updateUserProfile = async (profileData) => {
  try {
    const response = await api.put("/auth/profile/update/", profileData);
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error.response?.data || error.message;
  }
};

/**
 * Update user profile picture
 * @param {File} profilePicture - New profile picture file
 * @returns {Promise} - Server response data
 */
export const updateUserProfilePicture = async (profilePicture) => {
  try {
    const formData = new FormData();
    formData.append("profile_picture", profilePicture);

    const response = await api.put("/auth/profile/update-picture/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating profile picture:", error);
    throw error.response?.data || error.message;
  }
};

/**
 * Change user password
 * @param {Object} passwordData - Object containing oldPassword and newPassword
 * @returns {Promise} - Server response data
 */
export const changeUserPassword = async (passwordData) => {
  try {
    const response = await api.post("/auth/profile/change-password/", passwordData);
    return response.data;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error.response?.data || error.message;
  }
};

/**
 * Logout the user
 * Clears tokens and redirects to login page
 */
export const logoutUser = () => {
  try {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login"; // Redirect to login
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

/**
 * Initiate forgot password by sending OTP to the user's email
 * @param {string} email - User's email
 * @returns {Promise} - Server response data
 */
export const forgotPassword = async (email) => {
  try {
    const response = await api.post("/auth/forgot-password/", { email });
    return response.data;
  } catch (error) {
    console.error("Error during forgot password process:", error);
    throw error.response?.data || error.message;
  }
};

/**
 * Verify OTP sent for password reset
 * @param {string} email - User's email
 * @param {string} otp - OTP sent to the user's email
 * @returns {Promise} - Server response data
 */
export const verifyResetOtp = async (email, otp) => {
  try {
    const response = await api.post("/auth/verify-reset-otp/", { email, otp });
    return response.data;
  } catch (error) {
    console.error("Error during OTP verification for password reset:", error);
    throw error.response?.data || error.message;
  }
};

/**
 * Reset user's password
 * @param {string} email - User's email
 * @param {string} newPassword - New password for the user
 * @returns {Promise} - Server response data
 */
export const resetPassword = async (email, newPassword) => {
  try {
    const response = await api.post("/auth/reset-password/", { email, new_password: newPassword });
    return response.data;
  } catch (error) {
    console.error("Error during password reset:", error);
    throw error.response?.data || error.message;
  }
};
