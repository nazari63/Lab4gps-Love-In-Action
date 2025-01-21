// src/components/MembersPages/StatCard.js

import React from 'react';
import styles from './StatCard.module.css';
import { FaArrowUp } from 'react-icons/fa';

const StatCard = ({ title, icon: Icon, count, percentage }) => {
  return (
    <div className={styles.statCard}>
      <div className={styles.statHeader}>
        <h2 className={styles.statTitle}>{title}</h2>
        <Icon className={styles.statIcon} />
      </div>
      <div className={styles.statBody}>
        <strong className={styles.statCount}>{count}</strong>
        <div className={styles.statPercentageContainer}>
          <FaArrowUp className={styles.arrowIcon} />
          <span className={styles.statPercentage}>{percentage}% from last month</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
