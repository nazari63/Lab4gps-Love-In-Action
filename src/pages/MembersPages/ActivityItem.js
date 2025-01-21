// src/components/MembersPages/ActivityItem.js

import React from 'react';
import styles from './ActivityItem.module.css';

const ActivityItem = ({ icon: Icon, description, author, time }) => {
  return (
    <div className={styles.activityItem}>
      <div className={styles.activityIcon}>
        <Icon />
      </div>
      <div className={styles.activityContent}>
        <p className={styles.activityDescription}>{description}</p>
        <p className={styles.activityMeta}>{author} • {time}</p>
      </div>
    </div>
  );
};

export default ActivityItem;
