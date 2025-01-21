// src/components/MembersPages/UpcomingEvent.js

import React from 'react';
import styles from './UpcomingEvent.module.css';

const UpcomingEvent = ({ day, month, title, time }) => {
  return (
    <div className={styles.upcomingEvent}>
      <div className={styles.eventDate}>
        <strong className={styles.eventDay}>{day}</strong>
        <span className={styles.eventMonth}>{month}</span>
      </div>
      <div className={styles.eventDetails}>
        <h3 className={styles.eventTitle}>{title}</h3>
        <p className={styles.eventTime}>{time}</p>
      </div>
    </div>
  );
};

export default UpcomingEvent;
