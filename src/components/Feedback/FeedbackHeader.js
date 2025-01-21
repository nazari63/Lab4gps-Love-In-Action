// src/components/Feedback/FeedbackHeader.js

import React from 'react';
import styles from './FeedbackHeader.module.css';
import { FaUpload } from 'react-icons/fa';

const FeedbackHeader = ({ onUpload }) => {
  return (
    <header className={styles.feedbackHeader}>
      <h1 className={styles.title}>Feedback Dashboard</h1>
      <button className={styles.uploadButton} onClick={onUpload}>
        <FaUpload className={styles.uploadIcon} /> Submit Feedback
      </button>
    </header>
  );
};

export default FeedbackHeader;
