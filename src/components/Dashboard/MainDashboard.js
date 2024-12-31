// src/components/MainDashboard.js

import React, { useState } from 'react';
import '../styles/MainDashboard.css';
import { useAuth } from '../Context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserFriends,
  faChartLine,
  faBookmark,
  faUsers,
  faNewspaper,
  faCalendarAlt,
  faThumbsUp,
  faCommentDots,
  faShare,
  faPlus, // Importing plus icon for better UX
} from '@fortawesome/free-solid-svg-icons';
import SubmitProblem from '../ProblemAlert/SubmitProblem'; // Import SubmitProblem component

// LeftSidebar Component
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
  )
};

// ProblemCard Component
const ProblemCard = ({ problem }) => {
  // Placeholder for author's profile picture
  const authorProfilePic = '/default-profile.png'; // Replace with actual data if available

  // Format the date to a more readable format
  const formattedDate = new Date(problem.date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="problem-card">
      {/* Card Header: Author Info and Date */}
      <div className="card-header">
        <img src={authorProfilePic} alt={`${problem.author}'s Profile`} className="author-picture" />
        <div className="author-info">
          <span className="author-name">{problem.author}</span>
          <span className="post-date">{formattedDate}</span>
        </div>
      </div>

      {/* Card Content: Title and Description */}
      <div className="card-content">
        <h3 className="problem-title">{problem.title}</h3>
        <p className="problem-description">{problem.content}</p>
      </div>

      {/* Card Media: Images/Videos (if any) */}
      {problem.mediaFiles && problem.mediaFiles.length > 0 && (
        <div className="card-media">
          {problem.mediaFiles.map((file, index) => {
            if (file.type.startsWith('image/')) {
              return (
                <img key={index} src={file.url} alt={`Media ${index + 1}`} className="media-image" />
              );
            } else if (file.type.startsWith('video/')) {
              return (
                <video key={index} controls className="media-video">
                  <source src={file.url} type={file.type} />
                  Your browser does not support the video tag.
                </video>
              );
            } else {
              return null;
            }
          })}
        </div>
      )}

      {/* Card Footer: Engagement Buttons */}
      <div className="card-footer">
        <button className="engage-button">
          <FontAwesomeIcon icon={faThumbsUp} />
          <span>Like</span>
        </button>
        <button className="engage-button">
          <FontAwesomeIcon icon={faCommentDots} />
          <span>Comment</span>
        </button>
        <button className="engage-button">
          <FontAwesomeIcon icon={faShare} />
          <span>Share</span>
        </button>
      </div>
    </div>
  );

};

// MiddleArea Component
const MiddleArea = ({ user }) => {
  // State to manage modal visibility
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Placeholder data for submitted problems
  const submittedProblems = [
    {
      id: 1,
      title: "How to optimize React performance?",
      content: "I'm experiencing slow rendering in my React application. Any suggestions?",
      author: "John Doe",
      date: "2024-01-15",
      mediaFiles: [
        {
          type: 'image/jpeg',
          url: 'https://via.placeholder.com/600x400',
        },
        {
          type: 'video/mp4',
          url: 'https://www.w3schools.com/html/mov_bbb.mp4',
        },
      ],
    },
    {
      id: 2,
      title: "Best practices for RESTful APIs",
      content: "Looking for best practices in designing RESTful APIs. What should I focus on?",
      author: "Jane Smith",
      date: "2024-01-10",
      mediaFiles: [], // No media
    },
    // Add more problems as needed
  ];

  // Function to open the SubmitProblem modal
  const openSubmitModal = () => {
    setIsSubmitModalOpen(true);
  };

  // Function to close the SubmitProblem modal
  const closeSubmitModal = () => {
    setIsSubmitModalOpen(false);
  };

  return (
    <main className="middle-area">
      {/* Submit Problem Container */}
      <div className="submit-container">
        {/* Header Container for Submit Problem */}
        <div className="submit-problem-header">
          <img
            src={
              user?.profile_picture?.startsWith("http")
                ? user.profile_picture
                : `/default-profile.png`
            }
            alt={`${user?.first_name || 'User'}'s Profile`}
            className="submit-header-profile-picture"
          />
          <button className="submit-problem-link" onClick={openSubmitModal}>
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} />
            Submit a Problem
          </button>
        </div>
      </div>

      {/* Divider */}
      <hr className="submit-divider" />

      {/* Render SubmitProblem Modal */}
      {isSubmitModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-button" onClick={closeSubmitModal} aria-label="Close Modal">
              &times;
            </button>
            <SubmitProblem onClose={closeSubmitModal} />
          </div>
        </div>
      )}

      <h2 className="feed-title">Submitted Problems</h2>
      <div className="problems-feed">
        {submittedProblems.map((problem) => (
          <ProblemCard key={problem.id} problem={problem} />
        ))}
      </div>
    </main>
  );

};

// RightSidebar Component
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

// MainDashboard Component
const MainDashboard = () => {
  const { user } = useAuth(); // Assuming useAuth provides user data

  return (
    <div className="main-dashboard">
      <LeftSidebar user={user} />
      <MiddleArea user={user} />
      <RightSidebar />
    </div>
  );
};

export default MainDashboard;
