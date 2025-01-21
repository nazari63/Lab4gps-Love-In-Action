// src/components/Decision/DecisionCard.js

import React, { useState } from 'react';
import styles from './DecisionCard.module.css';
import { FaUser, FaClock, FaThumbsUp, FaThumbsDown, FaComments } from 'react-icons/fa';

const DecisionCard = ({ decision }) => {
  const [voteCount, setVoteCount] = useState(decision.votes);
  const [userVote, setUserVote] = useState(null); // null, 'upvote', 'downvote'

  const handleUpvote = () => {
    if (userVote === 'upvote') {
      setVoteCount(voteCount - 1);
      setUserVote(null);
    } else if (userVote === 'downvote') {
      setVoteCount(voteCount + 2);
      setUserVote('upvote');
    } else {
      setVoteCount(voteCount + 1);
      setUserVote('upvote');
    }
  };

  const handleDownvote = () => {
    if (userVote === 'downvote') {
      setVoteCount(voteCount + 1);
      setUserVote(null);
    } else if (userVote === 'upvote') {
      setVoteCount(voteCount - 2);
      setUserVote('downvote');
    } else {
      setVoteCount(voteCount - 1);
      setUserVote('downvote');
    }
  };

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h2 className={styles.title}>{decision.title}</h2>
        <span className={styles.status}>{decision.status}</span>
      </header>
      <p className={styles.proposer}>
        <FaUser className={styles.icon} /> {decision.proposedBy} •{' '}
        <FaClock className={styles.icon} /> {decision.daysAgo} days ago
      </p>
      <p className={styles.description}>{decision.description}</p>
      <div className={styles.votingSection}>
        <button
          className={`${styles.voteButton} ${
            userVote === 'upvote' ? styles.active : ''
          }`}
          onClick={handleUpvote}
          aria-label="Upvote"
        >
          <FaThumbsUp />
        </button>
        <span className={styles.voteCount}>{voteCount}</span>
        <button
          className={`${styles.voteButton} ${
            userVote === 'downvote' ? styles.active : ''
          }`}
          onClick={handleDownvote}
          aria-label="Downvote"
        >
          <FaThumbsDown />
        </button>
        <div className={styles.comments}>
          <FaComments className={styles.icon} /> {decision.comments} Comments
        </div>
      </div>
    </article>
  );
};

export default DecisionCard;
