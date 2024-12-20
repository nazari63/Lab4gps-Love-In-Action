import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../../assets/images/Lab4GPS_Logo_2024-1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [scroll, setScroll] = useState(false);

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
        <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
        <li className="nav-item">
          <div className="dropdown">
            <button className="dropbtn">About</button>
            <div className="dropdown-content">
              <Link to="/why">Purpose</Link>
              <Link to="/who">Mission</Link>
              <Link to="/what">Vision</Link>
              <Link to="/where">Core Values</Link>
              <Link to="/how">Who We Are</Link>
            </div>
          </div>
        </li>
        <li className="nav-item">
          <div className="dropdown">
            <button className="dropbtn">Problem Solver <FontAwesomeIcon icon={faCaretDown} /></button>
            <div className="dropdown-content">
              <Link to="/submit-problem">Submit a Problem</Link>
              <Link to="/solve-problem">Solve a Problem</Link>
              <Link to="/active-problems">View Active Problems</Link>
              <Link to="/problem-map">Problem Map</Link>
              <Link to="/my-contributions">My Contributions</Link>
              <Link to="/how-it-works">How It Works</Link>
              <Link to="/get-involved">Get Involved</Link>
              <Link to="/success-stories">Success Stories</Link>
            </div>
          </div>
        </li>
        <li className="nav-item">
          <div className="dropdown">
            <button className="dropbtn">Solutions <FontAwesomeIcon icon={faCaretDown} /></button>
            <div className="dropdown-content">
              <Link to="/solution-library">Solution Library</Link>
              <Link to="/contribute-solution">Contribute a Solution</Link>
              <Link to="/collaborative-projects">Collaborative Projects</Link>
              <Link to="/volunteer-opportunities">Volunteer Opportunities</Link>
              <Link to="/impact-stories">Impact Stories</Link>
              <Link to="/startups">Startups</Link>
            </div>
          </div>
        </li>
        <li className="nav-item">
          <div className="dropdown">
            <button className="dropbtn">Sponsorship</button>
            <div className="dropdown-content">
              <Link to="/become-sponsor">Become a Sponsor</Link>
              <Link to="/sponsorship-levels">Sponsorship Levels</Link>
              <Link to="/corporate-partnerships">Corporate Partnerships</Link>
              <Link to="/featured-sponsors">Featured Sponsors</Link>
              <Link to="/sponsorship-impact">Sponsorship Impact</Link>
              <Link to="/how-to-apply">How to Apply</Link>
              <Link to="/faqs-sponsors">FAQs for Sponsors</Link>
            </div>
          </div>
        </li>
        <li className="nav-item">
          <Link to="/get-started" className="nav-link button-get-started">Member Features</Link>
        </li>
        <li className="nav-item">
          {/* Language Selector */}
          <select className="language-selector">
            <option value="en">English</option>
            <option value="ko">한국어</option>
          </select>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
