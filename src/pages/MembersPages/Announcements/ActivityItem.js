// src/pages/MembersPages/ActivityItem.js

import React from 'react';
import styles from './ActivityItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const ActivityItem = ({ activity }) => {
  return (
    <div className={styles.activityItem}>
      <FontAwesomeIcon icon={activity.type === 'new_member' ? faUserPlus : faCheckCircle} className={styles.icon} />
      <div className={styles.details}>
        <span className={styles.message}>{activity.message}</span>
        <span className={styles.timestamp}>{activity.timestamp}</span>
      </div>
    </div>
  );
};

export default ActivityItem;
