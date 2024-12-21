import React from 'react';
import { useLang } from '../Context/LangContext'; // Import your global language context
import '../styles/Footer.css'; // Make sure this path is correct

const Footer = () => {
  // Access the current language from the global context
  const { language } = useLang();

  // Local translation dictionary for the Footer
  const text = {
    en: {
      tagline: "Love In Action. Solving One Another's Problem!",
      aboutUs: "About Us",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      contactUs: "Contact Us: ",
      feedback: "Give Feedback",
      twitter: "Twitter",
      facebook: "Facebook",
      linkedin: "LinkedIn",
      enterEmail: "Enter your email",
      subscribe: "Subscribe",
      rightsReserved: "All rights reserved."
    },
    ko: {
      tagline: "사랑으로 하나 되어 서로의 문제를 해결합시다!",
      aboutUs: "회사 소개",
      privacy: "개인정보 처리방침",
      terms: "이용 약관",
      contactUs: "문의하기: ",
      feedback: "피드백 보내기",
      twitter: "트위터",
      facebook: "페이스북",
      linkedin: "링크드인",
      enterEmail: "이메일을 입력하세요",
      subscribe: "구독하기",
      rightsReserved: "모든 권리 보유."
    }
  };

  // Helper function to pick the correct text based on the current language
  const t = (key) => text[language][key];

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section brand-section">
          <p className="tagline">{t("tagline")}</p>
        </div>

        <nav className="footer-section links-section">
          <a href="/about">{t("aboutUs")}</a>
          <a href="/privacy">{t("privacy")}</a>
          <a href="/terms">{t("terms")}</a>
        </nav>

        <div className="footer-section contact-section">
          <p>
            {t("contactUs")}
            <a href="mailto:info@lab4gps.com">gpslab@iwl.kr</a> | +123 456 7890
          </p>
        </div>

        <div className="footer-section social-section">
          <a href="https://twitter.com/lab4gps" className="social-link">
            {t("twitter")}
          </a>
          <a href="https://facebook.com/lab4gps" className="social-link">
            {t("facebook")}
          </a>
          <a href="https://linkedin.com/company/lab4gps" className="social-link">
            {t("linkedin")}
          </a>
        </div>

        <div className="footer-section interaction-section">
          <form className="newsletter-signup">
            <input
              type="email"
              id="newsletter-email"
              placeholder={t("enterEmail")}
              aria-label="Subscribe to newsletter"
            />
            <button type="submit">{t("subscribe")}</button>
          </form>
          <p>
            <a href="/feedback">{t("feedback")}</a>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 Lab4GPS. {t("rightsReserved")}</p>
      </div>
    </footer>
  );
};

export default Footer;
