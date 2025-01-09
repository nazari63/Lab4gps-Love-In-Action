// src/components/Navbar/LoginHeader.js

import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import '../styles/LoginHeader.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faLightbulb,
  faPuzzlePiece,
  faBriefcase, // Changed from faTachometerAlt to faBriefcase for Workspace
  faEnvelope,
  faBell,
  faChevronDown,
  faSearch,
  faHandshake, // For Sponsorship
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../Context/AuthContext';
import logo from '../../assets/images/Lab4GPS_Logo_2024-1.jpg'; // Ensure correct path to your logo

const LoginHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMeDropdownOpen, setIsMeDropdownOpen] = useState(false);
  const [isMemberDropdownOpen, setIsMemberDropdownOpen] = useState(false);

  const memberButtonRef = useRef(null);
  const meButtonRef = useRef(null);

  // ------------------------------------------------------
  // Profile Picture URL
  // ------------------------------------------------------
  const baseUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8080';
  const profilePictureUrl = user?.profile_picture?.startsWith('http')
    ? user.profile_picture
    : `${baseUrl}${user?.profile_picture || ''}`;

  // ------------------------------------------------------
  // Unread COUNTS for both MESSAGES and NOTIFICATIONS
  // ------------------------------------------------------
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);

  // On mount, set default unread counts
  useEffect(() => {
    setUnreadMessageCount(2);
    setUnreadNotificationCount(3);
  }, []);

  // On clicking the /message page, reset messages to 0
  const handleMessageClick = () => {
    setUnreadMessageCount(0);
  };

  // On clicking the /notifications page, reset notifications to 0
  const handleNotificationsClick = () => {
    setUnreadNotificationCount(0);
  };

  // ------------------------------------------------------
  // Logout
  // ------------------------------------------------------
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // ------------------------------------------------------
  // Dropdown toggles
  // ------------------------------------------------------
  const toggleMeDropdown = () => {
    setIsMeDropdownOpen(!isMeDropdownOpen);
    setIsMemberDropdownOpen(false);
  };

  const toggleMemberDropdown = () => {
    setIsMemberDropdownOpen(!isMemberDropdownOpen);
    setIsMeDropdownOpen(false);
  };

  // Close dropdowns if user clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (meButtonRef.current && !meButtonRef.current.contains(event.target)) {
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

  // Keyboard nav for 'Me'
  const handleMeKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMeDropdown();
    }
  };

  // Keyboard nav for 'For Members'
  const handleMemberKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMemberDropdown();
    }
  };

  // ------------------------------------------------------
  // Render
  // ------------------------------------------------------
  return (
    <header className="login-header">
      <nav className="nav-bar">
        {/* -----------------------------
            Left Section: Logo & Search
        ----------------------------- */}
        <div className="left-section">
          <img src={logo} alt="Company Logo" className="logo" />
          <div className="search-bar">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              placeholder="Search"
              className="search-input"
              aria-label="Search"
            />
          </div>
        </div>

        {/* -----------------------------
            Central Section: Nav Items
        ----------------------------- */}
        <div className="central-section">
          <NavLink
            to="/globe"
            className={({ isActive }) =>
              isActive || location.pathname === '/login-header'
                ? 'nav-item active'
                : 'nav-item'
            }
          >
            <FontAwesomeIcon icon={faHome} className="nav-icon" />
            <span className="nav-label">Home</span>
          </NavLink>

          <NavLink
            to="/workspace" // Updated route to '/workspace' assuming route change
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
          >
            <FontAwesomeIcon icon={faBriefcase} className="nav-icon" /> {/* Changed icon */}
            <span className="nav-label">Workspace</span> {/* Changed label */}
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? 'nav-item active' : 'nav-item'
            }
          >
            <FontAwesomeIcon icon={faLightbulb} className="nav-icon" />
            <span className="nav-label">Problem Solver</span>
          </NavLink>

          <NavLink
            to="/solution"
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
          >
            <FontAwesomeIcon icon={faPuzzlePiece} className="nav-icon" />
            <span className="nav-label">Solutions</span>
          </NavLink>

          <NavLink
            to="/sponsorship"
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
          >
            <FontAwesomeIcon icon={faHandshake} className="nav-icon" />
            <span className="nav-label">Sponsorship</span>
          </NavLink>

          {/* MESSAGES with badge */}
          <NavLink
            to="/message"
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
            onClick={handleMessageClick}
          >
            <div className="message-icon-container">
              <FontAwesomeIcon icon={faEnvelope} className="nav-icon" />
              {unreadMessageCount > 0 && (
                <span className="message-badge">{unreadMessageCount}</span>
              )}
            </div>
            <span className="nav-label">Messages</span>
          </NavLink>

          {/* NOTIFICATIONS with badge */}
          <NavLink
            to="/notifications"
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
            onClick={handleNotificationsClick}
          >
            <div className="notification-icon-container">
              <FontAwesomeIcon icon={faBell} className="nav-icon" />
              {unreadNotificationCount > 0 && (
                <span className="notification-badge">
                  {unreadNotificationCount}
                </span>
              )}
            </div>
            <span className="nav-label">Notifications</span>
          </NavLink>

          <div className="separator" />
        </div>

        {/* -----------------------------
            Right Section
        ----------------------------- */}
        <div className="right-section">
          {/* For Members Button */}
          <button
            className="member-button"
            onClick={toggleMemberDropdown}
            ref={memberButtonRef}
            aria-haspopup="true"
            aria-expanded={isMemberDropdownOpen}
            onKeyDown={handleMemberKeyDown}
          >
            For Members
            <FontAwesomeIcon icon={faChevronDown} className="dropdown-icon" />
          </button>

          {/* For Members Menu */}
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
          <div
            className="me-section"
            onClick={toggleMeDropdown}
            ref={meButtonRef}
            role="button"
            aria-haspopup="true"
            aria-expanded={isMeDropdownOpen}
            tabIndex={0}
            onKeyDown={handleMeKeyDown}
          >
            <img
              src={profilePictureUrl || '/default-profile.png'}
              alt={`${user?.first_name || 'User'}'s Profile`}
              className="profile-photo"
            />
            <span className="nav-label">
              {user?.first_name || 'User'} {user?.last_name || ''}
              <FontAwesomeIcon icon={faChevronDown} className="dropdown-icon" />
            </span>

            {isMeDropdownOpen && (
              <div className="dropdown-menu" role="menu">
                <div className="dropdown-header">
                  <img
                    src={profilePictureUrl || '/default-profile.png'}
                    alt={`${user?.first_name || 'User'}'s Profile`}
                    className="dropdown-profile-photo"
                  />
                  <div className="dropdown-user-info">
                    <span className="dropdown-user-name">
                      {user?.first_name || 'User'} {user?.last_name || ''}
                    </span>
                  </div>
                </div>

                <NavLink
                  to="/profile"
                  className="view-profile-button"
                  onClick={() => setIsMeDropdownOpen(false)}
                  role="menuitem"
                >
                  View Profile
                </NavLink>

                <div className="dropdown-section">
                  <h4 className="dropdown-section-title">Account</h4>
                  <NavLink
                    to="/settings"
                    className="dropdown-item"
                    onClick={() => setIsMeDropdownOpen(false)}
                    role="menuitem"
                  >
                    Settings and Privacy
                  </NavLink>
                  <NavLink
                    to="/help"
                    className="dropdown-item"
                    onClick={() => setIsMeDropdownOpen(false)}
                    role="menuitem"
                  >
                    Help
                  </NavLink>
                  <NavLink
                    to="/language"
                    className="dropdown-item"
                    onClick={() => setIsMeDropdownOpen(false)}
                    role="menuitem"
                  >
                    Language
                  </NavLink>
                </div>

                <div className="dropdown-section">
                  <h4 className="dropdown-section-title">Manage</h4>
                  <NavLink
                    to="/submitted-problems"
                    className="dropdown-item"
                    onClick={() => setIsMeDropdownOpen(false)}
                    role="menuitem"
                  >
                    Submitted Problems
                  </NavLink>
                  <NavLink
                    to="/submitted-solutions"
                    className="dropdown-item"
                    onClick={() => setIsMeDropdownOpen(false)}
                    role="menuitem"
                  >
                    Submitted Solutions
                  </NavLink>
                  <NavLink
                    to="/startups"
                    className="dropdown-item"
                    onClick={() => setIsMeDropdownOpen(false)}
                    role="menuitem"
                  >
                    Startups
                  </NavLink>
                  <NavLink
                    to="/collaboration-projects"
                    className="dropdown-item"
                    onClick={() => setIsMeDropdownOpen(false)}
                    role="menuitem"
                  >
                    Collaboration Projects
                  </NavLink>
                </div>

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
