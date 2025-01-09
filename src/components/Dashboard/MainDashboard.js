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
  faShare,
  faPlus, // Plus icon for better UX
  faEye, // See Details Icon
  faTools, // Solve This Problem Icon
  faMapMarkerAlt, // View on Map Icon
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
      <div className="sidebar-section user-info">
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
      <div className="sidebar-section profile-stats">
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
      <div className="sidebar-section my-startups">
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
        <a href="/startups" className="see-more-link">
          See More
        </a>
      </div>

      {/* Container 4: My Submitted Problems */}
      <div className="sidebar-section my-submitted-problems">
        <h3 className="section-title">My Submitted Problems</h3>
        <ul className="submitted-problems-list">
          <li className="submitted-problem-item">
            <span className="submitted-problem-name">Water Scarcity in City X</span>
          </li>
          <li className="submitted-problem-item">
            <span className="submitted-problem-name">Air Pollution in City Y</span>
          </li>
          {/* Add more submitted problems as needed */}
        </ul>
        <a href="/my-submitted-problems" className="see-more-link">
          See More
        </a>
      </div>

      {/* Container 5: Saved Items, Groups, Newsletters, Events */}
      <div className="sidebar-section additional-links">
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
  // Author's profile picture (could be part of the problem data)
  const authorProfilePic = problem.submitterPhoto
    ? URL.createObjectURL(problem.submitterPhoto)
    : 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80'; // Real image URL

  // Format the date to a more readable format
  const formattedDate = problem.date
    ? new Date(problem.date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Unknown Date';

  // State to manage the visibility of problem details
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  // Handler functions for new buttons
  const handleViewDetails = () => {
    setIsDetailsVisible(!isDetailsVisible);
  };

  const handleSolveProblem = () => {
    // Redirect to solve problem tools/forms
    // Replace '/solve-problem' with the actual route or functionality
    window.location.href = '/solve-problem';
  };

  const handleViewOnMap = () => {
    // Redirect to map view
    // Replace '/map-view' with the actual route or functionality
    window.location.href = '/map-view';
  };

  const handleShare = () => {
    // Implement share functionality
    // For example, copy link to clipboard or open share dialog
    navigator.clipboard.writeText(`${window.location.origin}/problems/${problem.id}`);
    alert('Problem link copied to clipboard!');
  };

  return (
    <div className="problem-card">
      {/* Card Header: Author Info and Date */}
      <div className="card-header">
        <img src={authorProfilePic} alt={`${problem.contactInfo.name}'s Profile`} className="author-picture" />
        <div className="author-info">
          <span className="author-name">{problem.contactInfo.name}</span>
          <span className="post-date">{formattedDate}</span>
        </div>
      </div>

      {/* Card Content: Title, Description, and Additional Details */}
      <div className="card-content">
        <h3 className="problem-title">{problem.problemTitle}</h3>
        <p className="problem-description">{problem.description}</p>

        {/* Additional Details Toggle */}
        {isDetailsVisible && (
          <div className="problem-details">
            <p><strong>Location:</strong> {problem.city}, {problem.country}</p>
            <p><strong>Category:</strong> {problem.category}</p>
            <p><strong>Urgency:</strong> {problem.urgency}</p>
            <p><strong>Contact:</strong> {problem.contactInfo.email}, {problem.contactInfo.phone}</p>
          </div>
        )}
      </div>

      {/* Card Media: Images/Videos (if any) */}
      {problem.mediaFiles && problem.mediaFiles.length > 0 && (
        <div className="card-media">
          <div className="media-slider">
            {problem.mediaFiles.map((file, index) => {
              if (file.type.startsWith('image/')) {
                return (
                  <img
                    key={index}
                    src={file.url}
                    alt={`Media ${index + 1}`}
                    className="media-item media-image"
                    loading="lazy"
                  />
                );
              } else if (file.type.startsWith('video/')) {
                return (
                  <video
                    key={index}
                    src={file.url}
                    className="media-item media-video"
                    controls
                    muted
                    preload="metadata"
                  >
                    Your browser does not support the video tag.
                  </video>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      )}

      {/* Card Footer: New Interaction Buttons */}
      <div className="card-footer">
        <button className="action-button" onClick={handleViewDetails} aria-label="View Details">
          <FontAwesomeIcon icon={faEye} />
          <span>Details</span>
        </button>
        <button className="action-button" onClick={handleSolveProblem} aria-label="Solve Problem">
          <FontAwesomeIcon icon={faTools} />
          <span>Solve</span>
        </button>
        <button className="action-button" onClick={handleViewOnMap} aria-label="View on Map">
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <span>Map</span>
        </button>
        <button className="action-button" onClick={handleShare} aria-label="Share Problem">
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

  // Updated dummy data for submitted problems with real images and videos
  const submittedProblems = [
    {
      id: 1,
      problemTitle: "Critical Water Shortage in Nairobi",
      country: "Kenya",
      city: "Nairobi",
      coordinates: { lat: -1.286389, lng: 36.817223 },
      description: "Nairobi is facing a severe water shortage due to prolonged droughts. Residents are struggling to access clean water.",
      category: "Water Scarcity",
      urgency: "Critical",
      date: "2024-01-15", // Added date
      mediaFiles: [
        {
          type: 'image/jpeg',
          url: 'https://images.unsplash.com/photo-1529053350475-923ac5044f0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', // Real image URL
        },
        {
          type: 'video/mp4',
          url: 'https://www.w3schools.com/html/mov_bbb.mp4', // Sample video URL
        },
        {
          type: 'image/png',
          url: 'https://images.unsplash.com/photo-1587502536263-4aef7a2880d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', // Real image URL
        },
      ],
      submitterPhoto: null, // Assuming no photo provided
      contactInfo: {
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "+254 700 123456",
      },
    },
    {
      id: 2,
      problemTitle: "Lack of Educational Resources in Rural Areas",
      country: "India",
      city: "Jaipur",
      coordinates: { lat: 26.912434, lng: 75.787270 },
      description: "Rural schools in Jaipur are lacking essential educational resources, hindering the learning process of students.",
      category: "Education",
      urgency: "High",
      date: "2024-02-20", // Added date
      mediaFiles: [
        {
          type: 'image/jpeg',
          url: 'https://images.unsplash.com/photo-1584697964409-72d83f28f469?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', // Real image URL
        },
      ],
      submitterPhoto: null,
      contactInfo: {
        name: "Jane Smith",
        email: "janesmith@example.com",
        phone: "+91 98765 43210",
      },
    },
    {
      id: 3,
      problemTitle: "Air Pollution in Delhi",
      country: "India",
      city: "Delhi",
      coordinates: { lat: 28.704060, lng: 77.102493 },
      description: "Delhi is experiencing dangerously high levels of air pollution, affecting the health of its residents.",
      category: "Environment",
      urgency: "Critical",
      date: "2024-03-10", // Added date
      mediaFiles: [],
      submitterPhoto: null,
      contactInfo: {
        name: "Raj Patel",
        email: "rajpatel@example.com",
        phone: "+91 91234 56789",
      },
    },
    {
      id: 4,
      problemTitle: "Road Infrastructure Decay in Detroit",
      country: "USA",
      city: "Detroit",
      coordinates: { lat: 42.331427, lng: -83.045754 },
      description: "Many roads in Detroit have deteriorated, leading to increased accidents and commute times.",
      category: "Infrastructure",
      urgency: "Medium",
      date: "2024-04-05", // Added date
      mediaFiles: [
        {
          type: 'image/jpeg',
          url: 'https://images.unsplash.com/photo-1541698444083-023c97d3f4b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', // Real image URL
        },
        {
          type: 'image/jpeg',
          url: 'https://images.unsplash.com/photo-1581091870624-7c75c10c2d55?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', // Real image URL
        },
      ],
      submitterPhoto: null,
      contactInfo: {
        name: "Emily Johnson",
        email: "emilyj@example.com",
        phone: "+1 313 555 7890",
      },
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
                : `https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80` // Real image URL
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
      title: "Implement Rainwater Harvesting",
      description: "Developing systems to collect and store rainwater to alleviate water scarcity.",
    },
    {
      id: 2,
      title: "Renewable Energy Adoption",
      description: "Transitioning to renewable energy sources to reduce air pollution.",
    },
    // Add more solutions as needed
  ];

  const collaborationProjects = [
    {
      id: 1,
      title: "Clean Air Initiative",
      description: "Looking for partners to work on reducing industrial emissions in urban areas.",
    },
    {
      id: 2,
      title: "Educational Outreach Program",
      description: "Seeking volunteers to teach coding and digital skills in underprivileged schools.",
    },
    // Add more projects as needed
  ];

  return (
    <aside className="right-sidebar">
      {/* Container 1: Recommended Solutions */}
      <div className="sidebar-section recommended-solutions">
        <h3 className="section-title">Recommended Solutions</h3>
        <ul className="solutions-list">
          {recommendedSolutions.map((solution) => (
            <li key={solution.id} className="solution-item">
              <h4 className="solution-title">{solution.title}</h4>
              <p className="solution-description">{solution.description}</p>
            </li>
          ))}
        </ul>
        <a href="/recommended-solutions" className="see-more-link">
          See More
        </a>
      </div>

      {/* Container 2: Collaboration Projects */}
      <div className="sidebar-section collaboration-projects">
        <h3 className="section-title">Projects Seeking Collaboration</h3>
        <ul className="projects-list">
          {collaborationProjects.map((project) => (
            <li key={project.id} className="project-item">
              <h4 className="project-title">{project.title}</h4>
              <p className="project-description">{project.description}</p>
            </li>
          ))}
        </ul>
        <a href="/projects-seeking-collaboration" className="see-more-link">
          See More
        </a>
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
