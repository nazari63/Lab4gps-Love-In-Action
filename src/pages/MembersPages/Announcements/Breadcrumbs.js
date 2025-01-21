// src/pages/MembersPages/Announcements/Breadcrumbs.js

import React from 'react';
import styles from './Breadcrumbs.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Breadcrumbs = () => {
  return (
    <nav className={styles.breadcrumbs} aria-label="breadcrumb">
      <span className={styles.breadcrumbItem}>Home</span>
      <FontAwesomeIcon icon={faChevronRight} className={styles.icon} />
      <span className={styles.breadcrumbItem}>Members</span>
      <FontAwesomeIcon icon={faChevronRight} className={styles.icon} />
      <span className={`${styles.breadcrumbItem} ${styles.current}`}>Announcements</span>
    </nav>
  );
};

export default Breadcrumbs;
