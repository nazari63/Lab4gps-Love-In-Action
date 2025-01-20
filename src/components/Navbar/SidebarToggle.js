// src/components/Navbar/SidebarToggle.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import '../styles/SidebarToggle.css';

const SidebarToggle = ({ toggleSidebar }) => {
  return (
    <button className="sidebar-toggle" onClick={toggleSidebar}>
      <FontAwesomeIcon icon={faBars} />
    </button>
  );
};

export default SidebarToggle;
