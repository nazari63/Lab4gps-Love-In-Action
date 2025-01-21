// src/components/Feedback/FeedbackCard.js

import React, { useState } from 'react';
import styles from './FeedbackCard.module.css';
import { FaComments, FaChevronDown } from 'react-icons/fa';
import CommentList from './CommentList/CommentList';
import CommentForm from './CommentForm/CommentForm';

const FeedbackCard = ({ feedback, onAddComment }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAddComment = (newComment) => {
    onAddComment(feedback.id, newComment);
  };

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>{feedback.title}</h2>
        <button
          className={styles.expandButton}
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-label="Toggle Feedback Details"
        >
          <FaChevronDown
            className={`${styles.chevron} ${isExpanded ? styles.rotate : ''}`}
          />
        </button>
      </div>
      <p className={styles.description}>{feedback.description}</p>
      <div className={styles.meta}>
        <span className={styles.category}>{feedback.category}</span>
        <span className={styles.date}>
          {feedback.daysAgo === 0
            ? 'Today'
            : `${feedback.daysAgo} day${feedback.daysAgo > 1 ? 's' : ''} ago`}
        </span>
        <span className={styles.comments}>
          <FaComments className={styles.commentsIcon} /> {feedback.comments.length} comments
        </span>
      </div>
      {isExpanded && (
        <div className={styles.details}>
          <CommentList comments={feedback.comments} />
          <CommentForm onSubmit={handleAddComment} />
        </div>
      )}
    </article>
  );
};

export default FeedbackCard;
