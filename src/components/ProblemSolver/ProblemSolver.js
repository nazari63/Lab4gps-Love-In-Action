// src/components/ProblemSolver/ProblemSolver.js

import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProblemSolver.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faGlobe,
  faTools,
  faInfoCircle,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const ProblemSolver = () => {
  const navigate = useNavigate();

  return (
    <div className="problem-solver-page">
      {/* Top Spacer */}
      <div className="top-spacer"></div>

      {/* Header Section */}
      <header className="problem-solver-header">
        <h1>Problem Solver</h1>
        <p className="problem-solver-tagline">
          Empowering solutions, one step at a time.
        </p>
      </header>

      {/* Options Section */}
      <section className="problem-solver-options">
        {/* Submit a Problem */}
        <div
          className="option-card option-large floating"
          onClick={() => navigate("/submit-problem")}
        >
          <FontAwesomeIcon icon={faPaperPlane} className="icon-large" />
          <h2>Submit a Problem</h2>
          <p>Have a problem? Submit it for a solution.</p>
        </div>

        {/* View Active Problems */}
        <div className="option-card option-medium">
          <FontAwesomeIcon icon={faGlobe} className="icon-medium" />
          <h2>View Active Problems</h2>
          <p>Explore ongoing problems:</p>
          <div className="view-options">
            <button
              className="view-button"
              onClick={() => navigate("/globe")}
            >
              View on Earth
            </button>
            <button
              className="view-button"
              onClick={() => navigate("/dashboard")}
            >
              View on Dashboard
            </button>
          </div>
        </div>

        {/* Solve a Problem */}
        <div
          className="option-card option-large floating"
          onClick={() => navigate("/solve-problem")}
        >
          <FontAwesomeIcon icon={faTools} className="icon-large" />
          <h2>Solve a Problem</h2>
          <p>Take on a challenge and help solve a problem.</p>
        </div>

        {/* How it Works */}
        <div
          className="option-card option-small lite-container"
          onClick={() => navigate("/how-it-works")}
        >
          <FontAwesomeIcon icon={faInfoCircle} className="icon-small" />
          <h2>How It Works</h2>
          <p>Learn about the process of problem-solving.</p>
        </div>

        {/* Success Stories */}
        <div
          className="option-card option-small lite-container"
          onClick={() => navigate("/success-stories")}
        >
          <FontAwesomeIcon icon={faStar} className="icon-small" />
          <h2>Success Stories</h2>
          <p>Be inspired by real-world success stories.</p>
        </div>
      </section>
    </div>
  );
};

export default ProblemSolver;
