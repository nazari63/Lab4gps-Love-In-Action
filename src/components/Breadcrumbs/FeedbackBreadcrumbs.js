// src/components/Breadcrumbs/FeedbackBreadcrumbs.js

import React from 'react';
import styles from './FeedbackBreadcrumbs.module.css';
import { FaChevronRight } from 'react-icons/fa';

const Breadcrumbs = () => {
  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <ol className={styles.breadcrumbList}>
        <li className={styles.breadcrumbItem}>
          <a href="/" className={styles.breadcrumbLink}>
            Home
          </a>
        </li>
        <li className={styles.separator}>
          <FaChevronRight />
        </li>
        <li className={styles.breadcrumbItem}>
          <a href="/members" className={styles.breadcrumbLink}>
            Members
          </a>
        </li>
        <li className={styles.separator}>
          <FaChevronRight />
        </li>
        <li className={styles.breadcrumbItem} aria-current="page">
          Feedback
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
