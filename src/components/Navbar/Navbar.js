import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
// Assuming your logo image path is correct and accessible
import logo from '../../assets/images/Lab4GPS_Logo_2024-1.jpg';

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
        {/* Link wrapping the img tag for navigation to the homepage when the logo is clicked */}
        <Link to="/">
          <img src={logo} alt="Lab4GPS Logo" />
        </Link>
      </div>
      <ul className="nav-links">
        <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
        <li className="nav-item">
          <div className="dropdown">
            <button className="dropbtn">About</button>
            <div className="dropdown-content">
              <Link to="/why">Why</Link>
              <Link to="/who">Who</Link>
              <Link to="/what">What</Link>
              <Link to="/where">Where</Link>
              <Link to="/how">How</Link>
            </div>
          </div>
        </li>
        <li className="nav-item"><Link to="/solutions" className="nav-link">Solutions</Link></li>
        <li className="nav-item"><Link to="/contact" className="nav-link">Contact Us</Link></li>
        <li className="nav-item search-item">
          <input type="text" placeholder="Search..." className="nav-search" />
        </li>
        <li className="nav-item">
          <Link to="/get-started" className="nav-link button-get-started">Member Features</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
