import React from 'react';
import '../styles/Footer.css'; // Make sure this path is correct

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section brand-section">
                    <p className="tagline">Love In Action. Solving One Another's Problem!</p>
                </div>
                <nav className="footer-section links-section">
                    <a href="/about">About Us</a>
                    <a href="/privacy">Privacy Policy</a>
                    <a href="/terms">Terms of Service</a>
                </nav>
                
                <div className="footer-section contact-section">
                    <p>Contact Us: <a href="mailto:info@lab4gps.com">gpslab@iwl.kr</a> | +123 456 7890</p>
                </div>
                <div className="footer-section social-section">
                    <a href="https://twitter.com/lab4gps" className="social-link">Twitter</a>
                    <a href="https://facebook.com/lab4gps" className="social-link">Facebook</a>
                    <a href="https://linkedin.com/company/lab4gps" className="social-link">LinkedIn</a>
                </div>
                <div className="footer-section interaction-section">
                    <form className="newsletter-signup">
                        <input type="email" id="newsletter-email" placeholder="Enter your email" aria-label="Subscribe to newsletter" />
                        <button type="submit">Subscribe</button>
                    </form>
                    <p><a href="/feedback">Give Feedback</a></p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2024 Lab4GPS. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
