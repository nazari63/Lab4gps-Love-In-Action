// src/components/HomeMenu.js

import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/HomeMenu.css'; // Import the CSS for styling
import { ModalContext } from '../Context/ModalContext'; // Import ModalContext

const HomeMenu = () => {
  // State to manage the visibility of the dropdown menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Access ModalContext
  const { openSubmitProblem } = useContext(ModalContext);

  // Function to toggle the menu's visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to close the menu when a link is clicked
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Handle 'Submit Problem' click to open SubmitProblem in Globe.js
  const handleSubmitProblemClick = (e) => {
    e.preventDefault(); // Prevent default navigation
    closeMenu();
    openSubmitProblem(); // Open the SubmitProblem modal
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
            exact="true"  // or "exact" in older versions of react-router-dom
            to="/"
            className={({ isActive }) => (isActive ? "active-link" : "")}
            onClick={closeMenu}
          >
            Home
          </NavLink>
        </li>

        {/* Submit Problem Link */}
        <li className="menu-item">
          {/* Use a button or anchor tag to trigger modal */}
          <a
            href="/submit-problem"
            className="nav-link"
            onClick={handleSubmitProblemClick}
          >
            Submit Problem
          </a>
        </li>

        {/* Remaining Menu Items */}
        <li className="menu-item">
          <NavLink
            to="/solve-problem"
            className={({ isActive }) => (isActive ? "active-link" : "")}
            onClick={closeMenu}
          >
            Solve Problem
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink
            to="/active-problems"
            className={({ isActive }) => (isActive ? "active-link" : "")}
            onClick={closeMenu}
          >
            View Active Problems
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "active-link" : "")}
            onClick={closeMenu}
          >
            Dashboard
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? "active-link" : "")}
            onClick={closeMenu}
          >
            Profile
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink
            to="/settings"
            className={({ isActive }) => (isActive ? "active-link" : "")}
            onClick={closeMenu}
          >
            Settings
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink
            to="/help"
            className={({ isActive }) => (isActive ? "active-link" : "")}
            onClick={closeMenu}
          >
            Help/Support
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active-link" : "")}
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
