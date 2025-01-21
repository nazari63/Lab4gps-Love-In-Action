// src/components/Sidebar/Sidebar.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaFolder, 
  FaBullhorn, 
  FaCogs, 
  FaLightbulb, 
  FaNewspaper, 
  FaShareAlt, 
  FaGavel, 
  FaCommentDots, 
  FaSearch,
  FaCommentAlt,
  FaUsersCog, 
  FaUserShield 
} from 'react-icons/fa'; // Importing Font Awesome icons from react-icons
import styles from './Sidebar.module.css';

const Sidebar = ({ collapsed, sidebarOpen, onToggleCollapse }) => {
  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''} ${sidebarOpen ? styles.open : ''}`}>
      
      {/* Header with collapse button */}
      <div className={styles.sidebarHeader}>
        <h2 className={styles.title}>
          {!collapsed ? 'GPSLab Portal' : 'GPS'}
        </h2>
        <button 
          className={styles.collapseBtn} 
          onClick={onToggleCollapse} 
          aria-label="Toggle Sidebar"
        >
          {/* Toggle Icon */}
          {collapsed ? <FaTachometerAlt /> : <FaUsersCog />}
        </button>
      </div>

      {/* Search Bar */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search..."
          className={styles.searchInput}
          aria-label="Search"
        />
        <FaSearch className={styles.searchIcon} />
      </div>

      {/* Navigation Menu */}
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <NavLink 
              to="/members/dashboard" 
              className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}
            >
              <FaTachometerAlt className={styles.icon} />
              {!collapsed && <span>Dashboard</span>}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/members/internal-archive" 
              className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}
            >
              <FaFolder className={styles.icon} />
              {!collapsed && <span>Internal Archive</span>}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/members/announcements" 
              className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}
            >
              <FaBullhorn className={styles.icon} />
              {!collapsed && <span>Announcements</span>}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/members/resources" 
              className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}
            >
              <FaCogs className={styles.icon} />
              {!collapsed && <span>Resources</span>}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/members/idea-hub" 
              className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}
            >
              <FaLightbulb className={styles.icon} />
              {!collapsed && <span>Idea Hub</span>}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/members/feedback" 
              className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}
            >
              <FaCommentDots className={styles.icon} />
              {!collapsed && <span>Feedback</span>}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/members/decisions" 
              className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}
            >
              <FaGavel className={styles.icon} />
              {!collapsed && <span>Decisions</span>}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/members/community-news" 
              className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}
            >
              <FaNewspaper className={styles.icon} />
              {!collapsed && <span>Community News</span>}
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Admin Tools Section */}
      <section className={styles.adminTools}>
        <h3 className={styles.sectionTitle}>Admin Tools</h3>
        <ul className={styles.adminList}>
          <li>
            <NavLink 
              to="/admin/user-management" 
              className={({ isActive }) => isActive ? `${styles.adminItem} ${styles.active}` : styles.adminItem}
            >
              <FaUsersCog className={styles.icon} />
              {!collapsed && <span>User Management</span>}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/access-control" 
              className={({ isActive }) => isActive ? `${styles.adminItem} ${styles.active}` : styles.adminItem}
            >
              <FaUserShield className={styles.icon} />
              {!collapsed && <span>Access Control</span>}
            </NavLink>
          </li>
        </ul>
      </section>
    </aside>
  );
};

export default Sidebar;
