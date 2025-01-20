// src/components/Sidebar/Sidebar.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArchive,
  faBullhorn,
  faBook,
  faLightbulb,
  faComments,
  faBalanceScale,
  faUsers,
  faRobot,
  faCog, // Settings
  faUserCircle, // Profile
} from '@fortawesome/free-solid-svg-icons';
import '../../components/styles/Sidebar.css';
import { useAuth } from '../Context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src="/path/to/logo.png" alt="Lab4GPS Logo" className="sidebar-logo" />
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/internal-archive" className="sidebar-item" activeClassName="active">
          <FontAwesomeIcon icon={faArchive} className="sidebar-icon" />
          <span className="sidebar-label">Internal Archive</span>
        </NavLink>
        <NavLink to="/announcements" className="sidebar-item" activeClassName="active">
          <FontAwesomeIcon icon={faBullhorn} className="sidebar-icon" />
          <span className="sidebar-label">Announcements</span>
        </NavLink>
        <NavLink to="/resource-sharing" className="sidebar-item" activeClassName="active">
          <FontAwesomeIcon icon={faBook} className="sidebar-icon" />
          <span className="sidebar-label">Resource Sharing</span>
        </NavLink>
        <NavLink to="/idea-hub" className="sidebar-item" activeClassName="active">
          <FontAwesomeIcon icon={faLightbulb} className="sidebar-icon" />
          <span className="sidebar-label">Idea Hub</span>
        </NavLink>
        <NavLink to="/feedback" className="sidebar-item" activeClassName="active">
          <FontAwesomeIcon icon={faComments} className="sidebar-icon" />
          <span className="sidebar-label">Feedback</span>
        </NavLink>
        <NavLink to="/decision-making-system" className="sidebar-item" activeClassName="active">
          <FontAwesomeIcon icon={faBalanceScale} className="sidebar-icon" />
          <span className="sidebar-label">Decision Making</span>
        </NavLink>
        <NavLink to="/member-news" className="sidebar-item" activeClassName="active">
          <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
          <span className="sidebar-label">Member News</span>
        </NavLink>
        <NavLink to="/ai-chatbot" className="sidebar-item" activeClassName="active">
          <FontAwesomeIcon icon={faRobot} className="sidebar-icon" />
          <span className="sidebar-label">AI Chatbot</span>
        </NavLink>

        {isAdmin && (
          <NavLink to="/admin-approval" className="sidebar-item" activeClassName="active">
            <FontAwesomeIcon icon={faCog} className="sidebar-icon" />
            <span className="sidebar-label">Admin Approval</span>
          </NavLink>
        )}
      </nav>
      <div className="sidebar-footer">
        <NavLink to="/profile" className="sidebar-item" activeClassName="active">
          <FontAwesomeIcon icon={faUserCircle} className="sidebar-icon" />
          <span className="sidebar-label">Profile</span>
        </NavLink>
        {/* Add more footer items if needed */}
      </div>
    </aside>
  );
};

export default Sidebar;
