// src/pages/MembersPages/MemberLanding.js

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import './MemberLanding.css';

const MemberLanding = () => {
  // Controls whether sidebar is in “mini” mode (desktop).
  const [collapsed, setCollapsed] = useState(false);

  // Controls whether sidebar is visible on mobile.
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Toggle collapse (desktop).
  const handleToggleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  // Toggle open/close (mobile).
  const handleSidebarToggle = () => {
    setSidebarOpen((prev) => !prev);
  };

  // If collapsed, content margin might be 60px (mini sidebar), else 240px
  // If on mobile, typically we ignore margin-left or let media queries handle it
  const contentMargin = collapsed ? '0px' : '0px';

  return (
    <div className="member-landing-container">
      {/* Pass both states and their toggles to Sidebar */}
      <Sidebar
        collapsed={collapsed}
        sidebarOpen={sidebarOpen}
        onToggleCollapse={handleToggleCollapse}
      />

      {/* Hamburger Menu for Mobile */}
      <button className="hamburger-btn" onClick={handleSidebarToggle}>
        &#9776; {/* could also be a FontAwesomeIcon */}
      </button>

      <div
        className="member-content-wrapper"
        style={{ marginLeft: contentMargin }}
      >
        <header className="member-header">
          {/* <h2>Members Portal</h2> */}
        </header>
        <div className="member-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MemberLanding;
