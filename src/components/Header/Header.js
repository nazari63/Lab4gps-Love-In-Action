// src/components/Header/Header.js

import React, { useState, useEffect } from 'react';
import TopNav from './TopNav';
import SubNav from './SubNav';
import '../../components/styles/Header.css'; // Combined styles for Header
import { useAuth } from '../Context/AuthContext';
import { useLocation } from 'react-router-dom';
import { useGlobe } from '../Globe/GlobeContext'; // Import GlobeContext

const Header = () => {
  const [isTopNavVisible, setIsTopNavVisible] = useState(false); // Initially hidden on Homepage
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const { isPlacingMarker } = useGlobe(); // Access marker placement state

  // Determine if the current route is the homepage
  const isHomepage = location.pathname === '/';

  const toggleTopNav = () => {
    setIsTopNavVisible((prev) => !prev);
  };

  // Ensure TopNav is hidden by default on the Homepage and visible otherwise
  useEffect(() => {
    if (isHomepage) {
      setIsTopNavVisible(false);
    } else {
      setIsTopNavVisible(true);
    }
  }, [isHomepage]);

  return (
    <header className={`main-header ${!isTopNavVisible ? 'without-topnav' : ''}`}>
      <TopNav isVisible={isTopNavVisible} />
      {isHomepage && (
        <SubNav
          toggleTopNav={toggleTopNav}
          isTopNavVisible={isTopNavVisible}
          isAuthenticated={isAuthenticated}
        />
      )}
    </header>
  );
};

export default Header;
