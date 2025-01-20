// src/pages/IdeaHub/IdeaHub.js

import React, { useEffect, useState } from 'react';
import IdeaHubService from '../../services/IdeaHubService';
import '../../components/styles/IdeaHub.css';

const IdeaHub = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const data = await IdeaHubService.getApprovedIdeas();
        setIdeas(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load ideas.');
        setLoading(false);
      }
    };
    fetchIdeas();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="idea-hub">
      <h2>Idea Hub</h2>
      <button className="submit-idea-button">Submit New Idea</button>
      <div className="ideas-list">
        {ideas.map(idea => (
          <div key={idea.id} className="idea-item">
            <h3>{idea.title}</h3>
            <p>{idea.description}</p>
            <div className="idea-actions">
              <button className="upvote-button">Upvote</button>
              <button className="downvote-button">Downvote</button>
            </div>
            <div className="comments-section">
              {/* Implement comments functionality here */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IdeaHub;
