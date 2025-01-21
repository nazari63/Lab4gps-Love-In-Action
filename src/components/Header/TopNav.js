// src/components/Header/TopNav.js

import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../components/styles/TopNav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

// Import your language context hook
import { useLang } from '../../components/Context/LangContext';

// Import Auth Context
import { useAuth } from '../../components/Context/AuthContext';

const TopNav = ({ isVisible }) => {
  const [scroll, setScroll] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { language, changeLanguage, t } = useLang();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const profileRef = useRef(null); // Reference for the profile dropdown

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Close profile dropdown on scroll
    const handleScrollCloseDropdown = () => {
      setIsProfileDropdownOpen(false);
    };
    window.addEventListener('scroll', handleScrollCloseDropdown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScrollCloseDropdown);
    };
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!isVisible) return null; // Do not render if not visible

  const handleLogout = () => {
    logout();
    // Optionally, redirect or show a message
  };

  return (
    <nav className={`top-navbar ${scroll ? 'scrolled' : ''}`}>
      {/* Primary Navigation Links */}
      <ul className="primary-nav-links">
        <li className="nav-item">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            {t("navbar.home")}
          </Link>
        </li>

        <li className="nav-item">
          <div className="dropdown">
            <button className="dropbtn">
              {t("navbar.about")} <FontAwesomeIcon icon={faCaretDown} />
            </button>
            <div className="dropdown-content">
              <Link to="/about/purpose">{t("navbar.aboutPurpose")}</Link>
              <Link to="/about/mission">{t("navbar.aboutMission")}</Link>
              <Link to="/about/vision">{t("navbar.aboutVision")}</Link>
              <Link to="/about/corevalues">{t("navbar.aboutCoreValues")}</Link>
              <Link to="/about/whoweare">{t("navbar.aboutWhoWeAre")}</Link>
            </div>
          </div>
        </li>

        {/* Problem Solver Dropdown */}
        <li className="nav-item">
          <div className="dropdown">
            <button className="dropbtn">
              {t("navbar.problemSolver")} <FontAwesomeIcon icon={faCaretDown} />
            </button>
            <div className="dropdown-content">
              <Link to="/submit-problem">{t("navbar.submitProblem")}</Link>
              <Link to="/solve-problem">{t("navbar.solveProblem")}</Link>
              <Link to="/active-problems">{t("navbar.viewActiveProblems")}</Link>
              <Link to="/problem-map">{t("navbar.problemMap")}</Link>
              <Link to="/my-contributions">{t("navbar.myContributions")}</Link>
              <Link to="/how-it-works">{t("navbar.howItWorks")}</Link>
              <Link to="/get-involved">{t("navbar.getInvolved")}</Link>
              <Link to="/success-stories">{t("navbar.successStories")}</Link>
            </div>
          </div>
        </li>

        {/* Solutions Dropdown */}
        <li className="nav-item">
          <div className="dropdown">
            <button className="dropbtn">
              {t("navbar.solutions")} <FontAwesomeIcon icon={faCaretDown} />
            </button>
            <div className="dropdown-content">
              <Link to="/solution-library">{t("navbar.solutionLibrary")}</Link>
              <Link to="/contribute-solution">{t("navbar.contributeSolution")}</Link>
              <Link to="/collaborative-projects">{t("navbar.collaborativeProjects")}</Link>
              <Link to="/volunteer-opportunities">{t("navbar.volunteerOpportunities")}</Link>
              <Link to="/impact-stories">{t("navbar.impactStories")}</Link>
              <Link to="/startups">{t("navbar.startups")}</Link>
            </div>
          </div>
        </li>

        {/* Sponsorship Dropdown */}
        <li className="nav-item">
          <div className="dropdown">
            <button className="dropbtn">{t("navbar.sponsorship")}</button>
            <div className="dropdown-content">
              <Link to="/become-sponsor">{t("navbar.becomeSponsor")}</Link>
              <Link to="/sponsorship-levels">{t("navbar.sponsorshipLevels")}</Link>
              <Link to="/corporate-partnerships">{t("navbar.corporatePartnerships")}</Link>
              <Link to="/featured-sponsors">{t("navbar.featuredSponsors")}</Link>
              <Link to="/sponsorship-impact">{t("navbar.sponsorshipImpact")}</Link>
              <Link to="/how-to-apply">{t("navbar.howToApply")}</Link>
              <Link to="/faqs-sponsors">{t("navbar.faqsSponsors")}</Link>
            </div>
          </div>
        </li>
      </ul>

      {/* Right Side: User Navigation */}
      {isAuthenticated && (
        <ul className="user-nav-links">
          {/* Messaging Icon */}
          <li className="nav-item">
            <Link to="/message" className="nav-link" aria-label="Messages">
              <FontAwesomeIcon icon="envelope" />
            </Link>
          </li>

          {/* Notification Icon */}
          <li className="nav-item">
            <Link to="/notifications" className="nav-link" aria-label="Notifications">
              <FontAwesomeIcon icon="bell" />
            </Link>
          </li>

          {/* Profile Dropdown */}
          <li className="nav-item profile-dropdown-container" ref={profileRef}>
            <button
              className="profile-btn"
              onClick={() => setIsProfileDropdownOpen(prev => !prev)}
              aria-label="Profile"
            >
              <FontAwesomeIcon icon="user" />
              <FontAwesomeIcon icon="caret-down" className="caret-icon" />
            </button>
            {isProfileDropdownOpen && (
              <div className="profile-dropdown">
                <Link
                  to="/profile"
                  className="dropdown-item"
                  onClick={() => setIsProfileDropdownOpen(false)}
                >
                  View Profile
                </Link>
                <Link
                  to="/settings"
                  className="dropdown-item"
                  onClick={() => setIsProfileDropdownOpen(false)}
                >
                  Settings
                </Link>
                <button className="dropdown-item" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </li>

          {/* Members Features Button */}
          <li className="nav-item">
            <Link to="/members" className="members-button" aria-label="Members Features">
              Members Features
            </Link>
          </li>

          {/* Language Personalization */}
          <li className="nav-item language-selector">
            <select
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              aria-label="Select Language"
            >
              <option value="en">English</option>
              <option value="es">Korean</option>
              {/* Add more languages as needed */}
            </select>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default TopNav;
