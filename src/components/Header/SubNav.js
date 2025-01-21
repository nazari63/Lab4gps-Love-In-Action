// src/components/Header/SubNav.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMapMarkerAlt, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../../components/styles/SubNav.css';
import logo from '../../assets/images/Lab4GPS_Logo_2024-1.jpg'; // Ensure correct path
import { Link } from 'react-router-dom';
import { useGlobe } from '../Globe/GlobeContext'; // Import GlobeContext

const SubNav = ({ toggleTopNav, isTopNavVisible, isAuthenticated }) => {
  const { activateMarkerPlacement } = useGlobe(); // Access GlobeContext function

  return (
    <div className={`sub-navbar ${isTopNavVisible ? 'with-topnav' : 'without-topnav'}`}>
      {/* Left: GPSLab Logo */}
      <div className="subnav-logo">
        <Link to="/">
          <img src={logo} alt="GPSLab Logo" />
        </Link>
      </div>

      {/* Center: Search Bar and Marker Toggle Button */}
      <div className="subnav-center">
        <div className="search-bar">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input type="text" placeholder="Search..." aria-label="Search" />
        </div>
        <button
          className={`marker-toggle-btn ${isAuthenticated ? '' : 'disabled'}`}
          onClick={() => {
            if (isAuthenticated) {
              activateMarkerPlacement();
            } else {
              alert('Please log in to place a marker.');
            }
          }}
          aria-label="Place a Marker"
          title={isAuthenticated ? 'Place a Marker' : 'Login to Place a Marker'}
          disabled={!isAuthenticated}
        >
          <FontAwesomeIcon icon={faMapMarkerAlt} />
        </button>
        {/* Toggle TopNav */}
        <button
          className="toggle-nav-btn"
          onClick={toggleTopNav}
          aria-label="Toggle Top Navigation"
        >
          <FontAwesomeIcon icon={isTopNavVisible ? faTimes : faBars} />
        </button>
      </div>
    </div>
  );
};

export default SubNav;
