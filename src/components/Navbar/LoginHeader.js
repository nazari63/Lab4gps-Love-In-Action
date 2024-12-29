// src/components/Navbar/LoginHeader.js

import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import '../styles/LoginHeader.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faLightbulb,
  faPuzzlePiece,
  faTachometerAlt,
  faEnvelope,
  faBell,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../Context/AuthContext';

const LoginHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility

  // Function to handle logout
  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login page after logout
  };

  // Function to toggle dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.me-section')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="login-header">
      <nav className="nav-bar">
        {/* Navigation Items */}
        <NavLink
          to="/globe" // Updated to point to /globe
          className={({ isActive }) =>
            isActive || location.pathname === '/login-header' ? "nav-item active" : "nav-item"
          }
        >
          <FontAwesomeIcon icon={faHome} className="nav-icon" />
          <span className="nav-label">Home</span>
        </NavLink>

        <NavLink
          to="/problem-solver"
          className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
        >
          <FontAwesomeIcon icon={faLightbulb} className="nav-icon" />
          <span className="nav-label">Problem Solver</span>
        </NavLink>

        <NavLink
          to="/solutions"
          className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
        >
          <FontAwesomeIcon icon={faPuzzlePiece} className="nav-icon" />
          <span className="nav-label">Solutions</span>
        </NavLink>

        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
        >
          <FontAwesomeIcon icon={faTachometerAlt} className="nav-icon" />
          <span className="nav-label">Dashboard</span>
        </NavLink>

        <NavLink
          to="/messages"
          className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
        >
          <FontAwesomeIcon icon={faEnvelope} className="nav-icon" />
          <span className="nav-label">Messages</span>
        </NavLink>

        <NavLink
          to="/notifications"
          className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
        >
          <FontAwesomeIcon icon={faBell} className="nav-icon" />
          <span className="nav-label">Notifications</span>
        </NavLink>

        {/* 'Me' Section */}
        <div className="nav-item me-section" onClick={toggleDropdown}>
          <img
            src={user?.profilePhoto || '/default-profile.png'} // Fallback to a default image
            alt="Profile"
            className="profile-photo"
          />
          <span className="nav-label">Me</span>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="dropdown-menu" role="menu">
              <NavLink
                to="/profile"
                className={({ isActive }) => (isActive ? "dropdown-item active" : "dropdown-item")}
                onClick={() => setIsDropdownOpen(false)}
                role="menuitem"
              >
                Profile
              </NavLink>
              <NavLink
                to="/settings"
                className={({ isActive }) => (isActive ? "dropdown-item active" : "dropdown-item")}
                onClick={() => setIsDropdownOpen(false)}
                role="menuitem"
              >
                Settings
              </NavLink>
              <button
                className="dropdown-item logout-button"
                onClick={handleLogout}
                role="menuitem"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default LoginHeader;
