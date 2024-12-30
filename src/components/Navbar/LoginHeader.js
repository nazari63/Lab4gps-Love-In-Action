// src/components/Navbar/LoginHeader.js

import React, { useState, useRef } from 'react';
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
  faChevronDown,
  faSearch,
  faHandshake, // Imported faHandshake for Sponsorship
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../Context/AuthContext';
import logo from '../../assets/images/Lab4GPS_Logo_2024-1.jpg'; // Ensure the correct path to your logo image

const LoginHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMeDropdownOpen, setIsMeDropdownOpen] = useState(false);
  const [isMemberDropdownOpen, setIsMemberDropdownOpen] = useState(false);
  const memberButtonRef = useRef(null);
  const meButtonRef = useRef(null);

  // Function to handle logout
  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login page after logout
  };

  // Function to toggle 'Me' dropdown menu
  const toggleMeDropdown = () => {
    setIsMeDropdownOpen(!isMeDropdownOpen);
    setIsMemberDropdownOpen(false); // Close other dropdown if open
  };

  // Function to toggle 'For Members' dropdown menu
  const toggleMemberDropdown = () => {
    setIsMemberDropdownOpen(!isMemberDropdownOpen);
    setIsMeDropdownOpen(false); // Close other dropdown if open
  };

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        meButtonRef.current &&
        !meButtonRef.current.contains(event.target)
      ) {
        setIsMeDropdownOpen(false);
      }
      if (
        memberButtonRef.current &&
        !memberButtonRef.current.contains(event.target)
      ) {
        setIsMemberDropdownOpen(false);
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
        {/* Left End Elements: Logo and Search Bar */}
        <div className="left-section">
          <img src={logo} alt="Company Logo" className="logo" />
          <div className="search-bar">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              placeholder="Search"
              className="search-input"
            />
          </div>
        </div>

        {/* Central Grouping: Navigation Items */}
        <div className="central-section">
          <NavLink
            to="/globe" // Points to /globe which displays Globe.js
            className={({ isActive }) =>
              isActive || location.pathname === '/login-header' ? "nav-item active" : "nav-item"
            }
          >
            <FontAwesomeIcon icon={faHome} className="nav-icon" />
            <span className="nav-label">Home</span>
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
          >
            <FontAwesomeIcon icon={faTachometerAlt} className="nav-icon" />
            <span className="nav-label">Dashboard</span>
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
            to="/sponsorship"
            className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
          >
            {/* Replaced faEnvelope with faHandshake for Sponsorship */}
            <FontAwesomeIcon icon={faHandshake} className="nav-icon" />
            <span className="nav-label">Sponsorship</span>
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

          {/* Separator */}
          <div className="separator"></div>
        </div>

        {/* Right-End Elements: For Members Button and 'Me' Section */}
        <div className="right-section">
          <button
            className="member-button"
            onClick={toggleMemberDropdown}
            ref={memberButtonRef}
          >
            For Members <FontAwesomeIcon icon={faChevronDown} className="dropdown-icon" />
          </button>

          {/* Member Dropdown Menu */}
          {isMemberDropdownOpen && (
            <div className="member-dropdown-menu" role="menu">
              <NavLink
                to="/internal-archive"
                className="member-dropdown-item"
                onClick={() => setIsMemberDropdownOpen(false)}
                role="menuitem"
              >
                Internal Archive
              </NavLink>
              <NavLink
                to="/idea-hub"
                className="member-dropdown-item"
                onClick={() => setIsMemberDropdownOpen(false)}
                role="menuitem"
              >
                Idea Hub
              </NavLink>
              <NavLink
                to="/member-news"
                className="member-dropdown-item"
                onClick={() => setIsMemberDropdownOpen(false)}
                role="menuitem"
              >
                Member News
              </NavLink>
              <NavLink
                to="/sharing"
                className="member-dropdown-item"
                onClick={() => setIsMemberDropdownOpen(false)}
                role="menuitem"
              >
                Sharing
              </NavLink>
              <NavLink
                to="/announcements"
                className="member-dropdown-item"
                onClick={() => setIsMemberDropdownOpen(false)}
                role="menuitem"
              >
                Announcements
              </NavLink>
              <NavLink
                to="/decision-making-system"
                className="member-dropdown-item"
                onClick={() => setIsMemberDropdownOpen(false)}
                role="menuitem"
              >
                Decision-Making System
              </NavLink>
              <NavLink
                to="/feedback"
                className="member-dropdown-item"
                onClick={() => setIsMemberDropdownOpen(false)}
                role="menuitem"
              >
                Feedback
              </NavLink>
              <NavLink
                to="/suggestions-system"
                className="member-dropdown-item"
                onClick={() => setIsMemberDropdownOpen(false)}
                role="menuitem"
              >
                Suggestions System
              </NavLink>
            </div>
          )}

          {/* 'Me' Section */}
          <div className="nav-item me-section" onClick={toggleMeDropdown} ref={meButtonRef}>
            <img
              src={user?.profilePhoto || '/default-profile.png'} // Fallback to a default image
              alt="Profile"
              className="profile-photo"
            />
            <span className="nav-label">
              Me <FontAwesomeIcon icon={faChevronDown} className="dropdown-icon" />
            </span>

            {/* 'Me' Dropdown Menu */}
            {isMeDropdownOpen && (
              <div className="dropdown-menu" role="menu">
                <NavLink
                  to="/profile"
                  className={({ isActive }) => (isActive ? "dropdown-item active" : "dropdown-item")}
                  onClick={() => setIsMeDropdownOpen(false)}
                  role="menuitem"
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/settings"
                  className={({ isActive }) => (isActive ? "dropdown-item active" : "dropdown-item")}
                  onClick={() => setIsMeDropdownOpen(false)}
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
        </div>
      </nav>
    </header>
  );
};

export default LoginHeader;
