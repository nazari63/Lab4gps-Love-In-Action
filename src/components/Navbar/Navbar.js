import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../../assets/images/Lab4GPS_Logo_2024-1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

// Import your language context hook
import { useLang } from '../Context/LangContext';

const Navbar = () => {
  const [scroll, setScroll] = useState(false);

  // Access the global language state and updater
  const { language, changeLanguage, t } = useLang();

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${scroll ? 'scrolled' : ''}`}>
      <div className="nav-logo">
        <Link to="/">
          <img src={logo} alt="Lab4GPS Logo" style={{ height: '50px' }} />
        </Link>
      </div>

      <ul className="nav-links">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            {t("navbar.home")}
          </Link>
        </li>

        <li className="nav-item">
          <div className="dropdown">
            <button className="dropbtn">{t("navbar.about")}</button>
            <div className="dropdown-content">
              <Link to="/why">{t("navbar.aboutPurpose")}</Link>
              <Link to="/who">{t("navbar.aboutMission")}</Link>
              <Link to="/what">{t("navbar.aboutVision")}</Link>
              <Link to="/where">{t("navbar.aboutCoreValues")}</Link>
              <Link to="/how">{t("navbar.aboutWhoWeAre")}</Link>
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

        <li className="nav-item">
          <Link to="/get-started" className="nav-link button-get-started">
            {t("navbar.memberFeatures")}
          </Link>
        </li>

        {/* Language Selector */}
        <li className="nav-item">
          <select
            className="language-selector"
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
          >
            <option value="en">{t("navbar.english")}</option>
            <option value="ko">{t("navbar.korean")}</option>
          </select>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
