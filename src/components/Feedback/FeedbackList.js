// src/components/Feedback/FeedbackList.js

import React from 'react';
import styles from './FeedbackList.module.css';
import FeedbackCard from './FeedbackCard';

const FeedbackList = ({ feedbacks, onAddComment }) => {
  if (feedbacks.length === 0) {
    return <p className={styles.noFeedback}>No feedback found.</p>;
  }

  return (
    <div className={styles.feedbackList}>
      {feedbacks.map((feedback) => (
        <FeedbackCard
          key={feedback.id}
          feedback={feedback}
          onAddComment={onAddComment}
        />
      ))}
    </div>
  );
};

export default FeedbackList;
