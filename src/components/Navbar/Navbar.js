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
  const { language, changeLanguage } = useLang();

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Inline dictionary for the Navbar
  const text = {
    en: {
      home: "Home",
      about: "About",
      aboutPurpose: "Purpose",
      aboutMission: "Mission",
      aboutVision: "Vision",
      aboutCoreValues: "Core Values",
      aboutWhoWeAre: "Who We Are",
      problemSolver: "Problem Solver",
      submitProblem: "Submit a Problem",
      solveProblem: "Solve a Problem",
      viewActiveProblems: "View Active Problems",
      problemMap: "Problem Map",
      myContributions: "My Contributions",
      howItWorks: "How It Works",
      getInvolved: "Get Involved",
      successStories: "Success Stories",
      solutions: "Solutions",
      solutionLibrary: "Solution Library",
      contributeSolution: "Contribute a Solution",
      collaborativeProjects: "Collaborative Projects",
      volunteerOpportunities: "Volunteer Opportunities",
      impactStories: "Impact Stories",
      startups: "Startups",
      sponsorship: "Sponsorship",
      becomeSponsor: "Become a Sponsor",
      sponsorshipLevels: "Sponsorship Levels",
      corporatePartnerships: "Corporate Partnerships",
      featuredSponsors: "Featured Sponsors",
      sponsorshipImpact: "Sponsorship Impact",
      howToApply: "Apply For Sponsorship",
      faqsSponsors: "FAQs for Sponsors",
      memberFeatures: "Member Features",
      english: "English",
      korean: "한국어"
    },
    ko: {
      home: "홈",
      about: "소개",
      aboutPurpose: "목적",
      aboutMission: "사명",
      aboutVision: "비전",
      aboutCoreValues: "핵심 가치",
      aboutWhoWeAre: "우리는 누구인가",
      problemSolver: "문제 해결사",
      submitProblem: "문제 등록",
      solveProblem: "문제 해결",
      viewActiveProblems: "진행 중인 문제 보기",
      problemMap: "문제 지도",
      myContributions: "내 기여",
      howItWorks: "작동 원리",
      getInvolved: "참여하기",
      successStories: "성공 사례",
      solutions: "해결책",
      solutionLibrary: "해결책 라이브러리",
      contributeSolution: "해결책 제안",
      collaborativeProjects: "협업 프로젝트",
      volunteerOpportunities: "봉사 기회",
      impactStories: "영향 사례",
      startups: "스타트업",
      sponsorship: "후원",
      becomeSponsor: "후원자 되기",
      sponsorshipLevels: "후원 등급",
      corporatePartnerships: "기업 파트너십",
      featuredSponsors: "주요 후원자",
      sponsorshipImpact: "후원의 영향",
      howToApply: "후원 신청",
      faqsSponsors: "후원 FAQ",
      memberFeatures: "멤버 기능",
      english: "영어",
      korean: "한국어"
    }
  };

  // Helper function to grab the right text based on current language
  const t = (key) => text[language][key];

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
            {t("home")}
          </Link>
        </li>

        <li className="nav-item">
          <div className="dropdown">
            <button className="dropbtn">{t("about")}</button>
            <div className="dropdown-content">
              <Link to="/why">{t("aboutPurpose")}</Link>
              <Link to="/who">{t("aboutMission")}</Link>
              <Link to="/what">{t("aboutVision")}</Link>
              <Link to="/where">{t("aboutCoreValues")}</Link>
              <Link to="/how">{t("aboutWhoWeAre")}</Link>
            </div>
          </div>
        </li>

        <li className="nav-item">
          <div className="dropdown">
            <button className="dropbtn">
              {t("problemSolver")} <FontAwesomeIcon icon={faCaretDown} />
            </button>
            <div className="dropdown-content">
              <Link to="/submit-problem">{t("submitProblem")}</Link>
              <Link to="/solve-problem">{t("solveProblem")}</Link>
              <Link to="/active-problems">{t("viewActiveProblems")}</Link>
              <Link to="/problem-map">{t("problemMap")}</Link>
              <Link to="/my-contributions">{t("myContributions")}</Link>
              <Link to="/how-it-works">{t("howItWorks")}</Link>
              <Link to="/get-involved">{t("getInvolved")}</Link>
              <Link to="/success-stories">{t("successStories")}</Link>
            </div>
          </div>
        </li>

        <li className="nav-item">
          <div className="dropdown">
            <button className="dropbtn">
              {t("solutions")} <FontAwesomeIcon icon={faCaretDown} />
            </button>
            <div className="dropdown-content">
              <Link to="/solution-library">{t("solutionLibrary")}</Link>
              <Link to="/contribute-solution">{t("contributeSolution")}</Link>
              <Link to="/collaborative-projects">{t("collaborativeProjects")}</Link>
              <Link to="/volunteer-opportunities">{t("volunteerOpportunities")}</Link>
              <Link to="/impact-stories">{t("impactStories")}</Link>
              <Link to="/startups">{t("startups")}</Link>
            </div>
          </div>
        </li>

        <li className="nav-item">
          <div className="dropdown">
            <button className="dropbtn">{t("sponsorship")}</button>
            <div className="dropdown-content">
              <Link to="/become-sponsor">{t("becomeSponsor")}</Link>
              <Link to="/sponsorship-levels">{t("sponsorshipLevels")}</Link>
              <Link to="/corporate-partnerships">{t("corporatePartnerships")}</Link>
              <Link to="/featured-sponsors">{t("featuredSponsors")}</Link>
              <Link to="/sponsorship-impact">{t("sponsorshipImpact")}</Link>
              <Link to="/how-to-apply">{t("howToApply")}</Link>
              <Link to="/faqs-sponsors">{t("faqsSponsors")}</Link>
            </div>
          </div>
        </li>

        <li className="nav-item">
          <Link to="/get-started" className="nav-link button-get-started">
            {t("memberFeatures")}
          </Link>
        </li>

        <li className="nav-item">
          {/* Language Selector */}
          <select
            className="language-selector"
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
          >
            <option value="en">{t("english")}</option>
            <option value="ko">{t("korean")}</option>
          </select>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
