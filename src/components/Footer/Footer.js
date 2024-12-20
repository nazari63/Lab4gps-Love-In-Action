import React from 'react';
import '../styles/Footer.css';  // Ensure this path matches your structure

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section brand-section">
                    <img src="%PUBLIC_URL%/logo-monochrome.svg" alt="Lab4GPS Logo" className="footer-logo" />
                    <p className="tagline">A Journey from the Heavens to Humanity</p>
                </div>
                <nav className="footer-section links-section">
                    <a href="/about">About Us</a>
                    <a href="/privacy">Privacy Policy</a>
                    <a href="/terms">Terms of Service</a>
                </nav>
                <div className="footer-section contact-section">
                    <p>Contact Us: <a href="mailto:info@lab4gps.com">info@lab4gps.com</a> | +123 456 7890</p>
                </div>
                <div className="footer-section social-section">
                    <a href="https://twitter.com/lab4gps" className="social-link">Twitter</a>
                    <a href="https://facebook.com/lab4gps" className="social-link">Facebook</a>
                    <a href="https://linkedin.com/company/lab4gps" className="social-link">LinkedIn</a>
                </div>
                <div className="footer-section interaction-section">
                    <form className="newsletter-signup">
                        <label htmlFor="newsletter-email">Stay Updated:</label>
                        <input type="email" id="newsletter-email" placeholder="Enter your email" />
                        <button type="submit">Subscribe</button>
                    </form>
                    <p>
                        <a href="/feedback">Give Feedback</a>
                    </p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2024 Lab4GPS. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
