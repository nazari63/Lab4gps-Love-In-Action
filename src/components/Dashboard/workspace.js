// src/components/Workspace/workspace.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/workspace.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// REPLACED MISSING ICONS with widely supported ones
import {
  faArrowCircleRight, // For "Go to Dashboard"
  faExpand,           // For expand
  faCompress          // For minimize
} from '@fortawesome/free-solid-svg-icons';

// ***** NEW IMPORTS FOR PROFESSOR AND TEACHING *****
import Professor from '../Dashboard/Professor';
import Teaching from '../Dashboard/Teaching';

// Placeholder paths for Professor AI avatar & TA AI avatar
import professorAvatar from '../../assets/images/Proff.webp';
import taAvatar from '../../assets/images/TA.webp';

const Workspace = () => {
  const navigate = useNavigate();

  // track which section (if any) is expanded: 'none' | 'left' | 'right'
  const [expandedSection, setExpandedSection] = useState('none');

  // ***** NEW STATE FOR STORING SELECTED SDG ID *****
  const [sdgId, setSdgId] = useState(null);

  // Handler to navigate to Dashboard
  const goToDashboard = () => {
    navigate('/workspace'); // Adjust route if necessary
  };

  // Toggle expand/minimize for the left (Professor AI) section
  const toggleLeftExpand = () => {
    if (expandedSection === 'left') {
      // currently expanded => revert to 'none'
      setExpandedSection('none');
    } else {
      setExpandedSection('left');
    }
  };

  // Toggle expand/minimize for the right (TA AI) section
  const toggleRightExpand = () => {
    if (expandedSection === 'right') {
      setExpandedSection('none');
    } else {
      setExpandedSection('right');
    }
  };

  // ***** onSDGChange callback from Professor -> store chosen SDG ID *****
  const handleSDGChange = (newSDGId) => {
    setSdgId(newSDGId);
  };

  return (
    <div className="workspace-container">
      {/* Header Section */}
      <header className="workspace-header">
        <div className="header-left">
          <h1>Welcome to Your Workspace!</h1>
        </div>
        <div className="header-center">
          <p>Track your progress and manage your tasks efficiently using the Dashboard.</p>
        </div>
        <div className="header-right">
          <button
            className="dashboard-button"
            onClick={goToDashboard}
            aria-label="Go to Dashboard"
          >
            Go to Dashboard
            <FontAwesomeIcon icon={faArrowCircleRight} className="dashboard-arrow" />
          </button>
        </div>
      </header>

      {/* Main Canvas Area */}
      <main
        className={`workspace-main ${
          expandedSection === 'left'
            ? 'left-expanded'
            : expandedSection === 'right'
            ? 'right-expanded'
            : ''
        }`}
      >
        {/* Always show vertical dividing line now; so it doesn't disappear upon expansion */}
        <div className="vertical-line"></div>

        {/* Left Section: Professor AI */}
        <section className="ai-section professor-ai">
          <div className="ai-header">
            <img
              src={professorAvatar}
              alt="Professor AI"
              className="ai-avatar"
            />
            <h2 className="ai-title">Professor AI</h2>
            {/* Expand/Minimize Icon */}
            <button
              className="expand-toggle-btn"
              onClick={toggleLeftExpand}
              aria-label="Expand or Minimize Left Section"
            >
              {expandedSection === 'left' ? (
                <FontAwesomeIcon icon={faCompress} />
              ) : (
                <FontAwesomeIcon icon={faExpand} />
              )}
            </button>
          </div>

          <div className="ai-content">
            {/* ***** REMOVED: "Welcome! I am Professor AI..." TEXT ***** */}

            {/* ***** INTEGRATE PROFESSOR COMPONENT ***** */}
            <Professor onSDGChange={handleSDGChange} />
          </div>
        </section>

        {/* Right Section: Teaching Assistance AI */}
        <section className="ai-section ta-ai">
          <div className="ai-header">
            <img
              src={taAvatar}
              alt="Teaching Assistance AI"
              className="ai-avatar"
            />
            <h2 className="ai-title">Teaching Assistance AI</h2>
            {/* Expand/Minimize Icon */}
            <button
              className="expand-toggle-btn"
              onClick={toggleRightExpand}
              aria-label="Expand or Minimize Right Section"
            >
              {expandedSection === 'right' ? (
                <FontAwesomeIcon icon={faCompress} />
              ) : (
                <FontAwesomeIcon icon={faExpand} />
              )}
            </button>
          </div>

          <div className="ai-content">
            {/* ***** REMOVED: "Hello! I am Teaching Assistance AI..." TEXT ***** */}

            {/* ***** INTEGRATE TEACHING COMPONENT (PASS CURRENT SDG) ***** */}
            <Teaching selectedSDGId={sdgId} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Workspace;
