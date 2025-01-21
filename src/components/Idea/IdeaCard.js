// src/components/Idea/IdeaCard.js

import React, { useState } from 'react';
import styles from './IdeaCard.module.css';
import Comment from './Comment';
import { FaCommentDots, FaArrowDown, FaArrowUp, FaSave, FaShare, FaDownload } from 'react-icons/fa';

const IdeaCard = ({ idea, onDownload, onSave, onShare }) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <article className={styles.card}>
      <div className={styles.voteSection}>
        <button className={styles.voteButton} aria-label="Upvote">
        <FaArrowUp />
        </button>
        <span className={styles.voteCount}>{idea.voteCount}</span>
        <button className={styles.voteButton} aria-label="Downvote">
          <FaArrowDown />
        </button>
      </div>
      <div className={styles.contentSection}>
        <div className={styles.statusContainer}>
          <span className={`${styles.statusBadge} ${styles[idea.status.toLowerCase().replace(' ', '-')]}`}>
            {idea.status}
          </span>
          <span className={styles.postInfo}>
            Posted by {idea.author} • {idea.daysAgo} days ago
          </span>
        </div>
        <h2 className={styles.title}>{idea.title}</h2>
        <p className={styles.description}>{idea.description}</p>
        <div className={styles.actions}>
          {/* <button
            className={styles.actionButton}
            onClick={() => onDownload(idea.id)}
            aria-label="Download Idea"
          >
            <FaDownload /> Download
          </button> */}
          <button
            className={styles.actionButton}
            onClick={() => onSave(idea.id)}
            aria-label="Save Idea"
          >
            <FaSave /> Save
          </button>
          <button
            className={styles.actionButton}
            onClick={() => onShare(idea.id)}
            aria-label="Share Idea"
          >
            <FaShare /> Share
          </button>
          <button
            className={styles.actionButton}
            onClick={() => setShowComments(!showComments)}
            aria-expanded={showComments}
            aria-controls={`comments-${idea.id}`}
          >
            <FaCommentDots /> {idea.commentCount} Comments
          </button>
        </div>
        {showComments && (
          <section id={`comments-${idea.id}`} className={styles.commentsSection}>
            {/* Placeholder for comments. Implement a Comment component as needed */}
            <Comment comment={idea.comments} onReply={() => {}} />
          </section>
        )}
      </div>
    </article>
  );
};

export default IdeaCard;
