// src/components/Workspace/workspace.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/workspace.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// REPLACED MISSING ICONS with widely supported ones
import {
  faArrowCircleRight, // For "Go to Dashboard" / "Go to Workspace"
  faExpand,           // For expand
  faCompress,         // For minimize
  faPaperclip         // For attaching documents
} from '@fortawesome/free-solid-svg-icons';

// ***** NEW IMPORTS FOR PROFESSOR AND TEACHING *****
import Professor from '../Dashboard/Professor';
import Teaching from '../Dashboard/Teaching';

// ***** IMPORT SOLVERDASHBOARD *****
import Solverdashboard from '../Dashboard/Solverdashboard';

// Placeholder paths for Professor AI avatar & TA AI avatar
import professorAvatar from '../../assets/images/Proff.webp';
import taAvatar from '../../assets/images/TA.webp';

const Workspace = () => {
  const navigate = useNavigate();

  // Track which section (if any) is expanded: 'none' | 'left' | 'right'
  const [expandedSection, setExpandedSection] = useState('none');

  // ***** NEW STATE FOR STORING SELECTED SDG ID *****
  const [sdgId, setSdgId] = useState(null);

  // **** NEW STATE: TEACHING AI "CHATGPT-LIKE" INPUT AND RESPONSES ****
  const [taInput, setTaInput] = useState('');
  const [taResponses, setTaResponses] = useState([]);

  // **** UPDATED STATE: SHOW OR HIDE DASHBOARD ****
  const [showDashboard, setShowDashboard] = useState(false);

  // **** UPDATED Handler: Toggle Dashboard View ****
  const toggleDashboard = () => {
    setShowDashboard((prevShowDashboard) => !prevShowDashboard);
  };

  // Toggle expand/minimize for the left (Professor AI) section
  const toggleLeftExpand = () => {
    if (expandedSection === 'left') {
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

  // **** SIMULATED "CHATGPT-LIKE" BEHAVIOR for Teaching AI ****
  const handleTaSubmit = (e) => {
    e.preventDefault();
    if (!taInput.trim()) return;

    // For demonstration, just echo the user's query as a "response".
    const userQuery = taInput.trim();
    const mockAnswer = `TA AI Response (Mock): I'm glad you asked "${userQuery}". 
    (In a real system, I'd consult an AI model to produce a relevant answer.)`;

    setTaResponses((prev) => [...prev, { query: userQuery, answer: mockAnswer }]);
    setTaInput('');
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
            onClick={toggleDashboard}
            aria-label={showDashboard ? "Go to Workspace" : "Go to Dashboard"}
          >
            {showDashboard ? "Go to Workspace" : "Go to Dashboard"}
            <FontAwesomeIcon icon={faArrowCircleRight} className="dashboard-arrow" />
          </button>
        </div>
      </header>

      {/* MAIN AREA LOGIC:
          If showDashboard is true, display <Solverdashboard />,
          Otherwise, display the two AI sections. 
      */}
      {!showDashboard && (
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
              {/* Integrate Professor component */}
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
              {/* Integrate Teaching component (pass current SDG) */}
              <Teaching selectedSDGId={sdgId} />

              {/* TA AI "ChatGPT-like" conversation */}
              <div className="ta-chat-container">
                {/* Conversation so far */}
                {taResponses.length > 0 && (
                  <div className="ta-chat-messages">
                    {taResponses.map((msg, i) => (
                      <div key={i} className="ta-chat-message">
                        <p className="ta-chat-query">
                          <strong>You:</strong> {msg.query}
                        </p>
                        <p className="ta-chat-answer">
                          <strong>TA AI:</strong> {msg.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Input form to ask TA AI */}
                <form className="ta-chat-form" onSubmit={handleTaSubmit}>
                  <div className="ta-chat-input-container">
                    <button 
                      type="button" 
                      className="ta-chat-attach"
                      aria-label="Attach a document"
                    >
                      <FontAwesomeIcon icon={faPaperclip} />
                    </button>
                    <input
                      type="text"
                      className="ta-chat-input"
                      placeholder="Ask Teaching AI anything..."
                      value={taInput}
                      onChange={(e) => setTaInput(e.target.value)}
                      aria-label="Ask Teaching Assistance AI"
                    />
                  </div>

                  <button type="submit" className="ta-chat-submit">
                    Send
                  </button>
                </form>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* If showDashboard is true, display Solverdashboard here */}
      {showDashboard && (
        <div className="solver-dashboard-container">
          <Solverdashboard />
        </div>
      )}
    </div>
  );
};

export default Workspace;
