// src/components/Solution/Solution.js

import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Solution.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faShare,
  faComments,
  faHandHoldingUsd,
  faUsers,
  faProjectDiagram,
} from "@fortawesome/free-solid-svg-icons"; // Import necessary icons
import { useAuth } from "../Context/AuthContext"; // Import useAuth for user data

const Solution = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Fetch user data from context

  // Base URL for profile pictures
  const baseUrl = process.env.REACT_APP_API_URL || "http://127.0.0.1:8080";
  const profilePictureUrl = user?.profile_picture?.startsWith("http")
    ? user.profile_picture
    : `${baseUrl}${user?.profile_picture || ""}`;

  // Dummy Data for other sections (startups, impact stories, etc.)
  const startups = [
    { id: 1, name: "Startup Alpha" },
    { id: 2, name: "Startup Beta" },
    { id: 3, name: "Startup Gamma" },
  ];

  const impactStories = [
    { id: 1, title: "Impact Story 1" },
    { id: 2, title: "Impact Story 2" },
  ];

  const volunteerOpportunities = [
    { id: 1, title: "Volunteer Opportunity 1" },
    { id: 2, title: "Volunteer Opportunity 2" },
  ];

  const postedProjects = [
    { id: 1, title: "Posted Project 1", details: "Details of posted project 1" },
    { id: 2, title: "Posted Project 2", details: "Details of posted project 2" },
  ];

  const collaborationRequests = [
    { id: 1, title: "Collaboration Request 1", details: "Details of collaboration request 1" },
    { id: 2, title: "Collaboration Request 2", details: "Details of collaboration request 2" },
  ];

  // Updated solutionPosts with real images and videos
  const solutionPosts = [
    {
      id: 1,
      user: "Alice Smith",
      userPhoto: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80",
      content: "Excited to share my latest project solving environmental sustainability!",
      mediaType: "image",
      media: "https://images.unsplash.com/photo-1518779578993-ec3579fee39e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", // Real image URL
      likes: 34,
      shares: 12,
      comments: 8,
    },
    {
      id: 2,
      user: "Bob Johnson",
      userPhoto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80",
      content: "Collaborating on a new solution for renewable energy challenges.",
      mediaType: "video",
      media: "https://www.w3schools.com/html/mov_bbb.mp4", // Sample video URL
      likes: 21,
      shares: 5,
      comments: 3,
    },
    {
      id: 3,
      user: "Charlie Davis",
      userPhoto: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80",
      content: "Launching a community initiative to promote tech education.",
      mediaType: "image",
      media: "https://images.unsplash.com/photo-1521791136062-1f4ec7dde30f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      likes: 45,
      shares: 20,
      comments: 15,
    },
    {
      id: 4,
      user: "Diana Prince",
      userPhoto: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80",
      content: "Developing an app to connect volunteers with local nonprofits.",
      mediaType: "video",
      media: "https://www.w3schools.com/html/movie.mp4", // Sample video URL
      likes: 28,
      shares: 7,
      comments: 4,
    },
    // Add more posts as needed
  ];

  return (
    <div className="solution-page">
      {/* Top Spacer to prevent overlap with fixed header */}
      <div className="solution-top-spacer"></div>

      <div className="solution-container">
        {/* Left Section */}
        <aside className="solution-left-section">
          {/* User Profile Container with Background Image */}
          <div className="solution-profile-container">
            {/* Background Image set via CSS */}
            <div className="solution-profile-background"></div>

            {/* Profile Info */}
            <div className="solution-profile-info">
              <img
                src={profilePictureUrl || "/default-profile.png"}
                alt={`${user?.first_name || "User"}'s Profile`}
                className="solution-profile-photo"
              />
              <h3 className="solution-user-name">
                {user?.first_name || "First Name"} {user?.last_name || "Last Name"}
              </h3>
            </div>
          </div>

          {/* Startups and Impact Stories Container */}
          <div className="solution-lite-container solution-startups-impact">
            <h4 className="solution-section-title">Startups</h4>
            <ul className="solution-list">
              {startups.map((startup) => (
                <li key={startup.id} className="solution-list-item">
                  {startup.name}
                </li>
              ))}
            </ul>
            <h4 className="solution-section-title">Impact Stories</h4>
            <ul className="solution-list">
              {impactStories.map((story) => (
                <li key={story.id} className="solution-list-item">
                  {story.title}
                </li>
              ))}
            </ul>
          </div>

          {/* Volunteer Opportunities Container */}
          <div className="solution-lite-container solution-volunteer-opportunities">
            <h4 className="solution-section-title">Volunteer Opportunities</h4>
            <ul className="solution-list">
              {volunteerOpportunities.map((opportunity) => (
                <li key={opportunity.id} className="solution-list-item">
                  {opportunity.title}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Middle Section */}
        <main className="solution-middle-section">
          {/* Post Button Container with Profile Photo */}
          <div className="solution-post-button-container solution-lite-container">
            <img
              src={profilePictureUrl || "/default-profile.png"}
              alt={`${user?.first_name || "User"}'s Profile`}
              className="solution-post-header-photo"
            />
            <button
              className="solution-post-button"
              onClick={() => navigate("/post-solution")}
            >
              Post your solutions/projects
            </button>
          </div>

          {/* Solution Posts Feed */}
          <div className="solution-posts-feed">
            {solutionPosts.map((post) => (
              <div className="solution-post-card" key={post.id}>
                <div className="solution-post-header">
                  <img
                    src={post.userPhoto || "/default-profile.png"}
                    alt={`${post.user} Profile`}
                    className="solution-post-user-photo"
                  />
                  <span className="solution-post-user-name">{post.user}</span>
                </div>
                <div className="solution-post-content">
                  <p>{post.content}</p>
                  {post.media && post.mediaType === "image" && (
                    <img
                      src={post.media}
                      alt="Post Media"
                      className="solution-post-media"
                    />
                  )}
                  {post.media && post.mediaType === "video" && (
                    <video
                      src={post.media}
                      className="solution-post-media"
                      controls
                      muted
                      preload="metadata"
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
                <div className="solution-post-actions">
                  <button className="solution-action-button" aria-label="Like">
                    <FontAwesomeIcon icon={faThumbsUp} /> {post.likes} Likes
                  </button>
                  <button className="solution-action-button" aria-label="Share">
                    <FontAwesomeIcon icon={faShare} /> {post.shares} Shares
                  </button>
                  <button className="solution-action-button" aria-label="Comments">
                    <FontAwesomeIcon icon={faComments} /> {post.comments} Comments
                  </button>
                  <button
                    className="solution-action-button sponsor-button"
                    aria-label="Sponsor this project"
                  >
                    <FontAwesomeIcon icon={faHandHoldingUsd} /> Sponsor
                  </button>
                </div>
                <div className="solution-post-footer">
                  <button
                    className="solution-collab-request-button"
                    aria-label="Join the Collaboration Hub to collaborate on this project"
                  >
                    <FontAwesomeIcon icon={faUsers} /> Join the Collaboration Hub to collaborate on this project
                  </button>
                  <button
                    className="solution-view-details-button"
                    onClick={() => navigate(`/solution-details/${post.id}`)}
                    aria-label="View Details"
                  >
                    <FontAwesomeIcon icon={faProjectDiagram} /> View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Right Section */}
        <aside className="solution-right-section">
          {/* My Posted Projects Container */}
          <div className="solution-lite-container solution-my-posted-projects">
            <h4 className="solution-section-title">My Posted Projects</h4>
            <ul className="solution-list">
              {postedProjects.map((project) => (
                <li key={project.id} className="solution-list-item">
                  <strong className="solution-project-title">
                    {project.title}
                  </strong>
                  <p className="solution-project-details">{project.details}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects Requesting Collaboration Container */}
          <div className="solution-lite-container solution-projects-collaboration">
            <h4 className="solution-section-title">
              Projects Requesting Collaboration
            </h4>
            <ul className="solution-list">
              {collaborationRequests.map((request) => (
                <li key={request.id} className="solution-list-item">
                  <strong className="solution-project-title">
                    {request.title}
                  </strong>
                  <p className="solution-project-details">{request.details}</p>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Solution;
