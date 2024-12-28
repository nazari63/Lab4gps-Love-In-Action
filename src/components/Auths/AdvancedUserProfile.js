import React, { useState, useEffect } from "react";
import "../styles/AdvancedUserProfile.css";
import { useAuth } from "../Context/AuthContext";

const ProfileHeader = ({ user }) => (
  <header className="advanced-profile-header">
    <h1>My Profile</h1>
    <p>Welcome, {user?.first_name || "User"}!</p>
  </header>
);

const ProfileSidebar = ({ user, handleProfilePictureChange }) => {
  const baseUrl = process.env.REACT_APP_API_URL || "http://127.0.0.1:8080";

  const profilePictureUrl = user?.profile_picture?.startsWith("http")
    ? user.profile_picture
    : `${baseUrl}${user?.profile_picture || ""}`;

  return (
    <aside className="advanced-profile-sidebar">
      <div className="advanced-profile-picture-wrapper">
        <div
          className="advanced-profile-picture"
          style={{
            backgroundImage: `url(${profilePictureUrl || "https://via.placeholder.com/150"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="advanced-edit-icon-container">
          <label className="advanced-edit-icon">
            ✏️
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              hidden
            />
          </label>
        </div>
      </div>
      <div className="advanced-profile-basic-info">
        <h2>
          {user?.first_name} {user?.last_name}
        </h2>
        <p>{user?.email}</p>
      </div>
    </aside>
  );
};

const ProfileDetails = ({
  formData,
  user,
  editMode,
  setEditMode,
  handleEditChange,
  handleEditSubmit,
}) => (
  <section className="advanced-profile-details">
    {!editMode ? (
      <>
        <div className="advanced-info-group">
          <h3>Account Information</h3>
          <p>
            <strong>Username:</strong> {user?.username}
          </p>
          <p>
            <strong>Registration Date:</strong> {user?.registration_date || "N/A"}
          </p>
          <p>
            <strong>Verified:</strong> {user?.is_verified ? "Yes" : "No"}
          </p>
        </div>
        <div className="advanced-buttons">
          <button
            type="button"
            onClick={() => setEditMode(true)}
            className="advanced-edit-button"
          >
            Edit Details
          </button>
        </div>
      </>
    ) : (
      <form onSubmit={handleEditSubmit}>
        <div className="advanced-edit-container">
          <h3>Edit Profile</h3>
          <div className="advanced-detail-group">
            <label>First Name:</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleEditChange}
            />
          </div>
          <div className="advanced-detail-group">
            <label>Last Name:</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleEditChange}
            />
          </div>
          <div className="advanced-detail-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleEditChange}
            />
          </div>
          <div className="advanced-detail-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleEditChange}
            />
          </div>
          <div className="advanced-detail-group">
            <label>Registration Date:</label>
            <input type="text" value={user?.registration_date || "N/A"} disabled />
          </div>
          <div className="advanced-detail-group">
            <label>Verified:</label>
            <input type="text" value={user?.is_verified ? "Yes" : "No"} disabled />
          </div>
        </div>
        <div className="advanced-buttons">
          <button
            type="button"
            onClick={() => setEditMode(false)}
            className="advanced-cancel-button"
          >
            Cancel
          </button>
          <button type="submit" className="advanced-save-button">
            Save Changes
          </button>
        </div>
      </form>
    )}
  </section>
);

const PasswordSection = ({
  changePasswordMode,
  setChangePasswordMode,
  passwordData,
  handlePasswordChange,
  handlePasswordSubmit,
}) => (
  <section className="advanced-password-section">
    <h2>Change Password</h2>
    <button
      onClick={() => setChangePasswordMode(!changePasswordMode)}
      className="advanced-password-button"
    >
      {changePasswordMode ? "Cancel" : "Change Password"}
    </button>
    {changePasswordMode && (
      <form onSubmit={handlePasswordSubmit} className="advanced-password-form">
        <div className="advanced-detail-group">
          <label>Old Password:</label>
          <input
            type="password"
            name="oldPassword"
            value={passwordData.oldPassword}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="advanced-detail-group">
          <label>New Password:</label>
          <input
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="advanced-detail-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" className="advanced-update-password-button">
          Update Password
        </button>
      </form>
    )}
  </section>
);

const AdvancedUserProfile = () => {
  const { user, updateProfile, updateProfilePicture, changePassword, logout } =
    useAuth();

  useEffect(() => {
    if (!user?.first_name || !user?.last_name) {
      console.warn("Incomplete user data:", user);
    }
  }, [user]);

  const [editMode, setEditMode] = useState(false);
  const [changePasswordMode, setChangePasswordMode] = useState(false);

  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    username: user?.username || "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        username: user.username || "",
      });
    }
  }, [user]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setEditMode(false);
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setError("Failed to update profile.");
      console.error(error);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      await changePassword(passwordData.oldPassword, passwordData.newPassword);
      setChangePasswordMode(false);
      setSuccessMessage("Password updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setError("Failed to change password.");
      console.error(error);
    }
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        await updateProfilePicture(file);
        setSuccessMessage("Profile picture updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (error) {
        setError("Failed to update profile picture.");
        console.error(error);
      }
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="advanced-profile-container">
      <ProfileHeader user={user} />
      {successMessage && <p className="advanced-success-message">{successMessage}</p>}
      {error && <p className="advanced-error-message">{error}</p>}
      <div className="advanced-profile-content">
        <div className="advanced-profile-layout">
          <ProfileSidebar
            user={user}
            handleProfilePictureChange={handleProfilePictureChange}
          />
          <ProfileDetails
            formData={formData}
            user={user}
            editMode={editMode}
            setEditMode={setEditMode}
            handleEditChange={handleEditChange}
            handleEditSubmit={handleEditSubmit}
          />
        </div>
      </div>
      <PasswordSection
        changePasswordMode={changePasswordMode}
        setChangePasswordMode={setChangePasswordMode}
        passwordData={passwordData}
        handlePasswordChange={handlePasswordChange}
        handlePasswordSubmit={handlePasswordSubmit}
      />
      <button onClick={handleLogout} className="advanced-logout-button">
        Logout
      </button>
    </div>
  );
};

export default AdvancedUserProfile;
