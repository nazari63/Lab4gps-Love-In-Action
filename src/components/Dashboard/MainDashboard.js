// src/components/MainDashboard.js

import React from 'react';
import '../styles/MainDashboard.css';
import { useAuth } from '../Context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserFriends,
  faChartLine,
  faRocket,
  faBookmark,
  faUsers,
  faNewspaper,
  faCalendarAlt,
  faLightbulb,
  faProjectDiagram,
} from '@fortawesome/free-solid-svg-icons';

// Placeholder components for demonstration
// In a real application, these would fetch and display actual data

const LeftSidebar = ({ user }) => {
  const baseUrl = process.env.REACT_APP_API_URL || "http://127.0.0.1:8080";
  const profilePictureUrl = user?.profile_picture?.startsWith("http")
    ? user.profile_picture
    : `${baseUrl}${user?.profile_picture || ""}`;

  return (
    <aside className="left-sidebar">
      {/* Container 1: User Info */}
      <div className="sidebar-container user-info">
        <div className="background-image"></div>
        <div className="profile-section">
          <img
            src={profilePictureUrl || '/default-profile.png'}
            alt={`${user?.first_name || 'User'}'s Profile`}
            className="profile-picture"
          />
          <h2 className="user-name">
            {user?.first_name || 'First Name'} {user?.last_name || 'Last Name'}
          </h2>
        </div>
      </div>

      {/* Container 2: Profile Views and Impressions */}
      <div className="sidebar-container profile-stats">
        <div className="stat-item">
          <FontAwesomeIcon icon={faUserFriends} className="stat-icon" />
          <div>
            <span className="stat-number">150</span>
            <span className="stat-label">Profile Views</span>
          </div>
        </div>
        <div className="stat-item">
          <FontAwesomeIcon icon={faChartLine} className="stat-icon" />
          <div>
            <span className="stat-number">75</span>
            <span className="stat-label">Impressions</span>
          </div>
        </div>
      </div>

      {/* Container 3: My Startups */}
      <div className="sidebar-container my-startups">
        <h3 className="section-title">My Startups</h3>
        <ul className="startup-list">
          <li className="startup-item">
            <span className="startup-name">Startup Alpha</span>
          </li>
          <li className="startup-item">
            <span className="startup-name">Beta Innovations</span>
          </li>
          {/* Add more startups as needed */}
        </ul>
      </div>

      {/* Container 4: Saved Items, Groups, Newsletters, Events */}
      <div className="sidebar-container additional-links">
        <h3 className="section-title">Saved Items</h3>
        <ul className="links-list">
          <li className="link-item">
            <FontAwesomeIcon icon={faBookmark} className="link-icon" />
            <span>Articles</span>
          </li>
          <li className="link-item">
            <FontAwesomeIcon icon={faUsers} className="link-icon" />
            <span>Groups</span>
          </li>
          <li className="link-item">
            <FontAwesomeIcon icon={faNewspaper} className="link-icon" />
            <span>Newsletters</span>
          </li>
          <li className="link-item">
            <FontAwesomeIcon icon={faCalendarAlt} className="link-icon" />
            <span>Events</span>
          </li>
        </ul>
      </div>
    </aside>
  );
};

const MiddleArea = () => {
  // Placeholder data for submitted problems
  const submittedProblems = [
    {
      id: 1,
      title: "How to optimize React performance?",
      content: "I'm experiencing slow rendering in my React application. Any suggestions?",
      author: "John Doe",
      date: "2024-01-15",
    },
    {
      id: 2,
      title: "Best practices for RESTful APIs",
      content: "Looking for best practices in designing RESTful APIs. What should I focus on?",
      author: "Jane Smith",
      date: "2024-01-10",
    },
    // Add more problems as needed
  ];

  return (
    <main className="middle-area">
      <h2 className="feed-title">Submitted Problems</h2>
      <div className="problems-feed">
        {submittedProblems.map((problem) => (
          <div key={problem.id} className="problem-card">
            <h3 className="problem-title">{problem.title}</h3>
            <p className="problem-content">{problem.content}</p>
            <div className="problem-footer">
              <span className="problem-author">{problem.author}</span>
              <span className="problem-date">{problem.date}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

const RightSidebar = () => {
  // Placeholder data for recommended solutions and collaboration projects
  const recommendedSolutions = [
    {
      id: 1,
      title: "Solution for React Performance",
      description: "Implementing memoization and code-splitting to enhance performance.",
    },
    {
      id: 2,
      title: "API Design Tips",
      description: "Utilizing proper HTTP methods and status codes for RESTful APIs.",
    },
    // Add more solutions as needed
  ];

  const collaborationProjects = [
    {
      id: 1,
      title: "AI Integration Project",
      description: "Seeking collaborators for integrating AI into our platform.",
    },
    {
      id: 2,
      title: "Mobile App Development",
      description: "Looking for partners to develop a cross-platform mobile application.",
    },
    // Add more projects as needed
  ];

  return (
    <aside className="right-sidebar">
      {/* Container 1: Recommended Solutions */}
      <div className="sidebar-container recommended-solutions">
        <h3 className="section-title">Recommended Solutions</h3>
        <ul className="solutions-list">
          {recommendedSolutions.map((solution) => (
            <li key={solution.id} className="solution-item">
              <h4 className="solution-title">{solution.title}</h4>
              <p className="solution-description">{solution.description}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Container 2: Collaboration Projects */}
      <div className="sidebar-container collaboration-projects">
        <h3 className="section-title">Projects Seeking Collaboration</h3>
        <ul className="projects-list">
          {collaborationProjects.map((project) => (
            <li key={project.id} className="project-item">
              <h4 className="project-title">{project.title}</h4>
              <p className="project-description">{project.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

const MainDashboard = () => {
  const { user } = useAuth(); // Assuming useAuth provides user data

  return (
    <div className="main-dashboard">
      <LeftSidebar user={user} />
      <MiddleArea />
      <RightSidebar />
    </div>
  );
};

export default MainDashboard;
