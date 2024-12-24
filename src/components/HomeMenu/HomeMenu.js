// src/components/HomeMenu.js

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/HomeMenu.css'; // Import the CSS for styling

const HomeMenu = () => {
  // State to manage the visibility of the dropdown menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu's visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to close the menu when a link is clicked
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="home-menu">
      {/* Menu Label and Hamburger Toggle Button */}
      <div className="menu-button" onClick={toggleMenu}>
        <span className="menu-label">Menu</span>
        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          aria-expanded={isMenuOpen}
        >
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
        </button>
      </div>

      {/* Dropdown Menu */}
      <ul className={`menu-list ${isMenuOpen ? 'active' : ''}`}>
        <li className="menu-item">
          <NavLink
            exact
            to="/"
            activeClassName="active-link"
            onClick={closeMenu}
          >
            Home
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink
            to="/submit-problem"
            activeClassName="active-link"
            onClick={closeMenu}
          >
            Submit Problem
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink
            to="/solve-problem"
            activeClassName="active-link"
            onClick={closeMenu}
          >
            Solve Problem
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink
            to="/active-problems"
            activeClassName="active-link"
            onClick={closeMenu}
          >
            View Active Problems
          </NavLink>
        </li>
        {/* Additional Menu Items */}
        <li className="menu-item">
          <NavLink
            to="/dashboard"
            activeClassName="active-link"
            onClick={closeMenu}
          >
            Dashboard
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink
            to="/profile"
            activeClassName="active-link"
            onClick={closeMenu}
          >
            Profile
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink
            to="/settings"
            activeClassName="active-link"
            onClick={closeMenu}
          >
            Settings
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink
            to="/help"
            activeClassName="active-link"
            onClick={closeMenu}
          >
            Help/Support
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink
            to="/about"
            activeClassName="active-link"
            onClick={closeMenu}
          >
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default HomeMenu;
