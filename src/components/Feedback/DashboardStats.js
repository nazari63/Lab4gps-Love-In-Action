// src/components/Feedback/DashboardStats.js

import React from 'react';
import styles from './DashboardStats.module.css';

const DashboardStats = ({ feedbacks }) => {
  const totalFeedback = feedbacks.length;
  const pendingReview = feedbacks.filter(
    (fb) => fb.status === 'Pending Review'
  ).length;
  const inProgress = feedbacks.filter((fb) => fb.status === 'In Progress')
    .length;
  const implemented = feedbacks.filter(
    (fb) => fb.status === 'Implemented'
  ).length;

  return (
    <div className={styles.dashboardStats}>
      <div className={styles.statCard}>
        <div className={styles.label}>Total Feedback</div>
        <div className={styles.value}>{totalFeedback}</div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.label}>Pending Review</div>
        <div className={styles.value}>{pendingReview}</div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.label}>In Progress</div>
        <div className={styles.value}>{inProgress}</div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.label}>Implemented</div>
        <div className={styles.value}>{implemented}</div>
      </div>
    </div>
  );
};

export default DashboardStats;
